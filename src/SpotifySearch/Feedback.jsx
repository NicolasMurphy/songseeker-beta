import getFlagUrl from "../utils/getFlagUrl";

const Feedback = ({ isCorrectGuess, isSubmitted, track, distanceMessage }) =>
  isCorrectGuess ? (
    isSubmitted && (
      <div>
        <img
          className="mx-auto my-4"
          width="96px"
          src={getFlagUrl(track.location)}
          alt={`${track.location} flag`}
        />
        <p>
          The correct country is{" "}
          <span className="font-bold">{track.location}</span>
          {isCorrectGuess ? (
            "! That is 6000 points!!!"
          ) : (
            <>
              .<br />
              You were {distanceMessage[0]} miles away. That is{" "}
              {distanceMessage[1]} points.
            </>
          )}
        </p>
      </div>
    )
  ) : (
    <>
      {isSubmitted && (
        <>
          {
            <img
              className="mx-auto my-4"
              width="96px"
              src={getFlagUrl(track.location)}
              alt={`${track.location} flag`}
            />
          }
          <p>
            The correct country is{" "}
            <span className="font-bold">{track.location}</span>
          </p>
          <p>
            You were{" "}
            <span className="font-bold">{distanceMessage[0]} miles</span> away.
            That is{" "}
            <span className="font-bold">{distanceMessage[1]} points</span>.
          </p>
        </>
      )}
    </>
  );

export default Feedback;
