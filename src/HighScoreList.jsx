import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

function HighScoreList({ database }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const scoresRef = ref(database, "scores");
    onValue(scoresRef, (snapshot) => {
      const scoreData = snapshot.val();
      if (scoreData) {
        const scoresArray = Object.entries(scoreData)
          .map(([key, value]) => ({ id: key, ...value }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        setScores(scoresArray);
      }
    });
  }, [database]);

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
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
