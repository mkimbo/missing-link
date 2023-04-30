import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../../auth/server-auth-provider";

export default function NewAlert() {
  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <h2>
          Send Out Missing person Alerts to all users near their last seen
          location
        </h2>
      </ServerAuthProvider>
    </div>
  );
}
