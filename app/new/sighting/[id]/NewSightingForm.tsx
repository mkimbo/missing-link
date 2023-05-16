"use client";

import * as React from "react";
import { useAuth } from "../../../../auth/hooks";
import styles from "./page.module.scss";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoadingCallback } from "react-loading-hook";
import { MdSave } from "react-icons/md";
import { TPerson } from "../../../../models/missing_person.model";
import FormDatePicker from "../../../../ui/form_date_picker";
import FormLocationInput from "../../../../ui/form_location_input";
import FormTextArea from "../../../../ui/form_text_area";
import FormTextField from "../../../../ui/form_text_field";

type Props = {
  missingPerson: TPerson;
};

export function NewSightingForm({ missingPerson }: Props) {
  const { tenant } = useAuth();
  const router = useRouter();

  const schema = z.object({
    sightingDate: z
      .date({
        required_error: "Required",
        invalid_type_error: "Required",
      })
      .min(
        new Date(missingPerson.lastSeenDate),
        "Date cannot be earlier that last seen date"
      )
      .max(new Date(), "Date cannot be later than today"),
    sightingLocation: z.string().optional(),
    placeId: z.string().nonempty("Please choose a location from the dropdown"),
    geoloc: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    geohash: z.string(),
    longAddress: z.string(),
    formattedAddress: z.string(),
    sightingDescription: z.string().max(350, "Maximum length").optional(),
  });
  type TSightingForm = z.infer<typeof schema>;

  const methods = useForm<TSightingForm>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: { sightingDate: new Date() },
  });

  const { handleSubmit, control, formState } = methods;
  const [handleSave, isRegisterLoading] = useLoadingCallback(
    async (phoneNumber: string) => {
      const response = await fetch("/api/add-phone-number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      });
      if (response.status === 200) {
        // router.push(url);
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
            <div className={styles.stepperBack}></div>

            <div
              onClick={() => {
                console.log(formState.errors, "errors");
                handleSubmit((values) => {
                  console.log(values, "values");
                  // handleSave(values);
                })();
              }}
              className={styles.stepperNext}
            >
              <span>Save</span>
              <MdSave fontSize={25} />
            </div>
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.stepperBody}>
            <div className={styles.additionalInfo}>
              <div
                className={styles.additionalInfoTitle}
              >{` Have you seen ${missingPerson.fullname}?`}</div>
              <div className={styles.additionalInfoField}>
                <div className={styles.label}> Sighting date: </div>
                <FormDatePicker
                  minDate={new Date(missingPerson.lastSeenDate)}
                  maxDate={new Date()}
                  name="sightingDate"
                  control={control}
                />
              </div>
              <div className={styles.additionalInfoField}>
                <div className={styles.label}> Sighting location: </div>
                <FormLocationInput name="sightingLocation" control={control} />
              </div>
              <div className={styles.additionalInfoField}>
                <div className={styles.label}>Description:</div>
                <FormTextArea
                  rows={5}
                  name="sightingDescription"
                  control={control}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
