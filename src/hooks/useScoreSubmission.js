import { ref, push } from "firebase/database";

const useScoreSubmission = (database) => {
  const submitScoreToFirebase = (username, score) => {
    const scoresRef = ref(database, "scores");
    push(scoresRef, {
      username,
      score,
    });
  };

  return { submitScoreToFirebase };
};

export default useScoreSubmission;
