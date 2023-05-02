import styles from "./page.module.scss";
import { MdCrisisAlert } from "react-icons/md";
import { VscBroadcast } from "react-icons/vsc";
export async function generateStaticParams() {
  return [{}];
}

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Welcome to <span>MissingLink</span>
      </h2>
      <p className={styles.description}>A Missing Person Alert Service</p>
      <div className={styles.card}>
        <VscBroadcast className={styles.icon} color={"#ff4400"} fontSize={80} />
        <p className={styles.about}>
          Broadcast a missing person alert to all users within the location you
          last saw the person. Users can also report the sighting of a missing
          person on the platform
        </p>
      </div>
    </div>
  );
}
