import useStore from "../../store";
import useFetchScores from "../../hooks/useFetchHighScores";

interface HighScoreListProps {
  database: object;
}

interface Score {
  id: string;
  username: string;
  score: number;
}

const HighScoreList: React.FC<HighScoreListProps> = ({ database }) => {
  useFetchScores(database);

  const { scores, error, loading } = useStore();

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      {loading && (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
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
              {scores.map((score: Score, index: number) => (
                <tr key={score.id}>
                  <th>{index + 1}</th>
                  <td>{score.username}</td>
                  <td>{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HighScoreList;
