import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';

function HighScoreList({ database }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const scoresRef = ref(database, 'scores');
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
    <div>
      <h2>Top 10 Scores</h2>
      <ul>
        {scores.map((score) => (
          <li key={score.id}>{score.username}: {score.score}</li>
        ))}
      </ul>
    </div>
  );
}

export default HighScoreList;
