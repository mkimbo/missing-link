import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { UserProfile } from "../UserProfile";

export default function Profile() {
  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <UserProfile />
      </ServerAuthProvider>
    </div>
  );
}
