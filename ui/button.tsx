import * as React from "react";
import styles from "./button.module.scss";
import { LoadingIcon } from "./icons";

export function Button({
  loading,
  children,
  ...props
}: JSX.IntrinsicElements["button"] & { loading?: boolean }) {
  return (
    <button className={styles.button} {...props}>
      {loading && <LoadingIcon className={styles.icon} />}
      <span>{children}</span>
    </button>
  );
}
