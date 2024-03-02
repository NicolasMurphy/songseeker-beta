import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

function HighScoreList({ database }) {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scoresRef = ref(database, "scores");
    const unsubscribe = onValue(scoresRef, (snapshot) => {
      const scoreData = snapshot.val();
      if (scoreData) {
        // Convert object to array and group by username
        const groupedByUser = Object.entries(scoreData).reduce((acc, [key, value]) => {
          const { username } = value;
          if (!acc[username]) {
            acc[username] = [];
          }
          acc[username].push({ id: key, ...value });
          return acc;
        }, {});
        // For each user, find the highest score
        const topScores = Object.values(groupedByUser).map(userScores => {
          return userScores.reduce((topScore, current) => {
            return current.score > topScore.score ? current : topScore;
          });
        });
        const scoresArray = topScores.sort((a, b) => b.score - a.score).slice(0, 10);
        setScores(scoresArray);
        setError(null);
      }
    }, (error) => {
      setError("There was a problem accessing the leaderboard. This may be due to regional restrictions affecting connectivity.");
    });
    return () => unsubscribe();
  }, [database]);

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score.id}>
                <th>{index + 1}</th>
                <td>{score.username}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HighScoreList;
