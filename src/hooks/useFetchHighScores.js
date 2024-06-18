import { useEffect } from "react";
import { ref, onValue } from "firebase/database";
import useStore from "../store";

const useFetchScores = (database) => {
  const { setScores, setError, setLoading } = useStore();

  useEffect(() => {
    const scoresRef = ref(database, "scores");
    const unsubscribe = onValue(
      scoresRef,
      (snapshot) => {
        const scoreData = snapshot.val();
        if (scoreData) {
          // Convert object to array and group by username
          const groupedByUser = Object.entries(scoreData).reduce(
            (acc, [key, value]) => {
              const { username } = value;
              if (!acc[username]) {
                acc[username] = [];
              }
              acc[username].push({ id: key, ...value });
              return acc;
            },
            {}
          );
          // For each user, find the highest score
          const topScores = Object.values(groupedByUser).map((userScores) => {
            return userScores.reduce((topScore, current) => {
              return current.score > topScore.score ? current : topScore;
            });
          });
          const scoresArray = topScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
          setScores(scoresArray);
          setError(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(
          "There was a problem accessing the leaderboard. This may be due to regional restrictions affecting connectivity."
        );
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [database, setScores, setError, setLoading]);
};

export default useFetchScores;
