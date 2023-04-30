import styles from "./page.module.scss";
import { Button } from "../../../ui/button";
import Link from "next/link";
import { ServerAuthProvider } from "../../../auth/server-auth-provider";

export default function Sighting() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/">
          <Button>Go back to home page</Button>
        </Link>
      </nav>
      <h1 className={styles.title}>Report Sighting</h1>
      <p className={styles.description}>This page is server-side rendered</p>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <h2>Report Sighting</h2>
      </ServerAuthProvider>
    </div>
  );
}
