import styles from "./page.module.scss";
import Link from "next/link";
import { Button } from "../ui/button";
import { IoIosArrowForward } from "react-icons/io";
export async function generateStaticParams() {
  return [{}];
}

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">MissingLink</a>
      </h1>
      <p className={styles.description}>A Missing Person Alert Service</p>
      <div className={styles.card}>
        <h2>Explore</h2>
        <Link href="/register">
          <div className={styles.exploreLink}>
            <IoIosArrowForward fontSize={23} color={"#ff4400"} /> Send New Alert
          </div>
        </Link>
        <Link href="/new/sighting">
          <div className={styles.exploreLink}>
            <IoIosArrowForward fontSize={23} color={"#ff4400"} /> Report a
            Sighting
          </div>
        </Link>
        <Link href="/profile">
          <div className={styles.exploreLink}>
            <IoIosArrowForward fontSize={23} color={"#ff4400"} /> Search Missing
            List
          </div>
        </Link>
      </div>
    </div>
  );
}
