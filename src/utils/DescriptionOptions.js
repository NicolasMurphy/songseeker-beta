import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const getDescriptionOptions = async () => {
  const descriptionOptionsCollection = collection(firestore, "descriptionOptions");
  // const descriptionOptionsCollection = collection(firestore, "TestDescriptionOptions"); // for testing
  const q = query(descriptionOptionsCollection, orderBy("order"));
  const snapshot = await getDocs(q);
  const descriptions = snapshot.docs.map(doc => doc.data());
  return descriptions;
};

export default getDescriptionOptions;
