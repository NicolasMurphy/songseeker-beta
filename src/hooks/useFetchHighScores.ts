import { useEffect } from "react";
import { Database, ref, onValue } from "firebase/database";
import useStore from "../store";

interface Score {
  username: string;
  score: number;
  id?: string;
}

const useFetchScores = (database: Database) => {
  const { setScores, setError, setLoading } = useStore();

  useEffect(() => {
    const scoresRef = ref(database, "scores");
    const unsubscribe = onValue(
      scoresRef,
      (snapshot) => {
        const scoreData: Record<string, Score> | null = snapshot.val();
        if (scoreData) {
          const groupedByUser = Object.entries(scoreData).reduce(
            (acc: Record<string, Score[]>, [key, value]) => {
              const { username } = value;
              if (!acc[username]) {
                acc[username] = [];
              }
              acc[username].push({ id: key, ...value });
              return acc;
            },
            {}
          );
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
