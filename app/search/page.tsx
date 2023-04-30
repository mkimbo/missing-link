import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";

export default function Search() {
  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <h2>Search list of missing people near you</h2>
      </ServerAuthProvider>
    </div>
  );
}
