"use client";

import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import sampleMissing from "../../public/missing-person.webp";
import { placeholderUrl } from "../../utils/constants";
import { CgGenderMale, CgGenderFemale } from "react-icons/cg";
interface TSearchHit {
  objectID: string;
  image: string;
  fullname: string;
}

export function SearchHit({ hit }: any) {
  const genderIcon =
    hit?.gender == "Male" ? (
      <CgGenderMale color={"#ff4400"} fontSize={15} />
    ) : (
      <CgGenderFemale color={"#ff4400"} fontSize={15} />
    );
  return (
    <Link className={styles.searchHit} href={`/missing/${hit?.objectID}`}>
      <Image
        className={styles.hitImage}
        src={hit?.image ? hit?.image : sampleMissing}
        alt={hit?.fullname}
        width={120}
        height={120}
        placeholder="blur"
        blurDataURL={placeholderUrl}
      />
      <div className={styles.hitName}>
        {hit?.fullname}
        <span>{` ${hit?.age ?? "12"}`}</span>
        <span>{genderIcon}</span>
      </div>
      <div className={styles.hitDetails}></div>
    </Link>
  );
}
