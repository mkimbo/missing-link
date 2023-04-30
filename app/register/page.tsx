import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { RegisterForm } from "./RegisterForm";

export default function Register() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <RegisterForm />
      </ServerAuthProvider>
    </div>
  );
}
