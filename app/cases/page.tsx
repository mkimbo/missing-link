import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { serverDB } from "../../utils/firebase";
import { TPerson } from "../../models/missing_person.model";
import PersonList from "./PersonList";

async function getMissingPersonList(): Promise<TPerson[]> {
  const data: any[] = [];
  const docs = await serverDB
    .collection("reported_missing")
    // .where("found", "==", false)
    .get();
  docs.forEach((doc) => {
    const dataObj = doc.data();
    data.push({
      id: doc.id,
      ...dataObj,
    });
  });
  return data as TPerson[];
}

export default async function MissingPersonList() {
  const data = await getMissingPersonList();
  return (
    <>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <div className={styles.container}>
          <PersonList personList={data} />
        </div>
      </ServerAuthProvider>
    </>
  );
}
