import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../../auth/server-auth-provider";
import TextField from "../../../ui/form_text_field";
import { NewAlertForm } from "./NewAlertForm";
import { Suspense } from "react";
import { LoadingIcon } from "../../../ui/icons";

export default function NewAlert() {
  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
              }}
            >
              <LoadingIcon />
            </div>
          }
        >
          <NewAlertForm />
        </Suspense>
      </ServerAuthProvider>
    </div>
  );
}
