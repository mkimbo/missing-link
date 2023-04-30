import { Navbar } from "./Components/Navbar";
import "./globals.scss";
import styles from "./layout.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            <a
              href="https://github.com/awinogrodzki/next-firebase-auth-edge"
              target="_blank"
            >
              footer in root layout
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
