import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { SearchPage } from "./SearchPage";

export default function Search() {
  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <SearchPage />
      </ServerAuthProvider>
    </div>
  );
}
