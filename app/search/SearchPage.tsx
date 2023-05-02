"use client";

import * as React from "react";
import { useAuth } from "../../auth/hooks";
import styles from "./page.module.scss";
import { Button } from "../../ui/button";
import { LoadingIcon } from "../../ui/icons";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web";
import { SearchHit } from "./SearchHit";
import "./SearchPage.css";
const searchClient = algoliasearch(
  "CL1J39H1NX",
  "ce211c83e6d53b3d69f6520822956850"
);
export function SearchPage() {
  const { tenant } = useAuth();

  if (!tenant) {
    return null;
  }

  return (
    <InstantSearch searchClient={searchClient} indexName={"reported_missing"}>
      <div>
        <SearchBox className={styles.searchBox} placeholder={"Search"} />
      </div>

      <Hits hitComponent={SearchHit} />
    </InstantSearch>
  );
}
