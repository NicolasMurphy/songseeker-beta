import { Database, ref, push } from "firebase/database";
import useStore from "../store";

const useScoreSubmission = (database: Database) => {
  const { score } = useStore();
  const submitScoreToFirebase = (username: string) => {
    const scoresRef = ref(database, "scores");
    push(scoresRef, {
      username,
      score,
    });
  };

  return { submitScoreToFirebase };
};

export default useScoreSubmission;
