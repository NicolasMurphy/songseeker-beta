import { ref, push } from "firebase/database";
import useStore from "../store";

const useScoreSubmission = (database) => {
  const { score } = useStore();
  const submitScoreToFirebase = (username) => {
    const scoresRef = ref(database, "scores");
    push(scoresRef, {
      username,
      score,
    });
  };

  return { submitScoreToFirebase };
};

export default useScoreSubmission;
