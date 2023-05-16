"use client";

import React, { useState } from "react";
import styles from "./page.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSave,
} from "react-icons/md";
import { useAuth } from "../../../auth/hooks";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { useLoadingCallback } from "react-loading-hook";
import { uploadFileToCloud } from "../../../auth/firebase";
import { toast } from "react-toastify";
//import { getFileObjectFromBlobUrl } from "../../../utils/firebase";
export type FormSchema = z.infer<typeof schema>;

export function getFileObjectFromBlobUrl(blobUrl: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", blobUrl);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(`Failed to retrieve file from ${blobUrl}.`);
      }
    };
    xhr.onerror = () => {
      reject(`Failed to retrieve file from ${blobUrl}.`);
    };
    xhr.send();
  });
}

const schema = z.object({
  fullname: z.string().nonempty("Required"),
  othername: z.string().optional(),
  age: z.number().int().positive().max(99, "Invalid age"),
  gender: z.string().nonempty("Required"),
  complexion: z.string().nonempty("Required"),
  lastSeenDate: z
    .date({
      required_error: "Required",
      invalid_type_error: "Required",
    })
    .min(
      new Date(new Date().getTime() - 48 * 60 * 60 * 1000),
      "Date must be less than 3 days ago"
    )
    .max(new Date(), "Date either or in the last 48 hours"),
  lastSeenLocation: z.string().optional(),
  placeId: z.string().nonempty("Please choose a location from the dropdown"),
  geoloc: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  geohash: z.string(),
  longAddress: z.string(),
  formattedAddress: z.string(),
  county: z.string(),
  constituency: z.string(),
  secondaryContact: z.string().nonempty("Required"),
  lastSeenDescription: z
    .string()
    .max(350, "Maximum length")
    .nonempty("Required"),
  images: z.array(z.string()).transform((data, ctx) => {
    if (!Array.isArray(data) || data.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please add at least one recent photo",
      });
      return z.NEVER;
    }
    return data.map((item) => item.trim());
  }),
  policeStation: z.string().nonempty("Required"),
  obNumber: z.string().nonempty("Required"),
});

export function NewAlertForm() {
  const { tenant } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      fullname: "Test User",
      images: [],
      othername: "",
      age: 12,
      complexion: "Dark",
      gender: "F",
      secondaryContact: "0722222222",
      lastSeenDescription:
        "They were last seen wearing clothes and shoes. They had a bag with them. They were last seen at the bus stop.",
      obNumber: "7857454885485",
    },
  });

  const { handleSubmit, formState, trigger } = methods;
  const [handleSave, isSaveLoading] = useLoadingCallback(
    async (validatedData: FormSchema) => {
      const files: string[] = [];
      console.log(validatedData, "validatedData");

      for await (const item of validatedData.images) {
        const file = await getFileObjectFromBlobUrl(item);
        const downloadUrl = await uploadFileToCloud(file);
        if (downloadUrl) {
          files.push(downloadUrl);
        }
      }

      if (files.length < 1) {
        return;
      }
      const data = {
        ...validatedData,
        createdBy: tenant?.id,
        images: files,
        found: false,
      };
      const response = await fetch("/api/add-missing-person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("success", data.id);
        toast.success("Alert created successfully");
        router.push(`/cases/${data.id}`);
      }
    }
  );

  const getProgressBar = (progressBar: string) => {
    return (
      <div className={styles.progressbar}>
        <div className={styles.progress} style={{ width: progressBar }}></div>
      </div>
    );
  };

  if (!tenant) {
    return null;
  }
  return (
    <FormProvider {...methods}>
      <form>
        <div className={styles.stepperWrapper}>
          <div className={styles.stepperHeader}>
            <div
              onClick={() => setCurrentStep(currentStep - 1)}
              className={styles.stepperBack}
            >
              {currentStep != 1 && <MdKeyboardArrowLeft fontSize={25} />}
              {currentStep != 1 && <span>Back</span>}
            </div>
            {currentStep != 3 && (
              <div
                onClick={async () => {
                  if (currentStep == 1) {
                    const result = await trigger([
                      "fullname",
                      "othername",
                      "age",
                      "gender",
                      "complexion",
                      "images",
                    ]);
                    if (result) setCurrentStep(currentStep + 1);
                  }
                  if (currentStep == 2) {
                    const result = await trigger([
                      "fullname",
                      "othername",
                      "age",
                      "gender",
                      "complexion",
                      "images",
                      "lastSeenDescription",
                      "lastSeenDate",
                      "lastSeenLocation",
                      "secondaryContact",
                      "placeId",
                    ]);
                    if (result) setCurrentStep(currentStep + 1);
                  }
                }}
                className={styles.stepperNext}
              >
                <span>Next</span>
                <MdKeyboardArrowRight fontSize={25} />
              </div>
            )}
            {currentStep == 3 && (
              <div
                onClick={() => {
                  console.log(formState.errors, "errors");
                  handleSubmit((values) => {
                    handleSave(values);
                  })();
                }}
                className={styles.stepperNext}
              >
                <span>Save</span>
                <MdSave fontSize={25} />
              </div>
            )}
          </div>
          {getProgressBar(`${Math.round((currentStep / 3) * 100).toString()}%`)}
          <div className={styles.stepperBody}>
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
