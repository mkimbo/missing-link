import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../../auth/server-auth-provider";

export default function Sighting() {
  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <h2>Report the Sighting of a missing person</h2>
      </ServerAuthProvider>
    </div>
  );
}
