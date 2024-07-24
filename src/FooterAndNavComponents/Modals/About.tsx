import List from "../List";

const howToPlayItems = [
  "Listen closely to each track — make sure your volume is turned up!",
  "Guess the country of origin on the map.",
  "Collect points for accuracy! The closer your guess, the higher your score.",
  <>
    Use the{" "}
    <span className="inline-block text-info">
      <button className="btn btn-circle btn-success pointer-events-none">
        50/50
      </button>
    </span>{" "}
    button to narrow down your choices to two countries. You only get one per
    game, so choose wisely!
  </>,
  <>
    Click the{" "}
    <span className="inline-block text-info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="w-4 h-4 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>{" "}
    icon to learn more about each track.
  </>,
];

const About = () => (
  <div className="container mx-auto text-center px-6 py-8">
    <h1 className="text-4xl font-bold mb-8">About</h1>
    <p className="mb-10 text-lg">
      SongSeeker is a music education geography game! Featuring music from over
      150 countries!
    </p>
    <h2 className="text-3xl font-bold mb-6">How to Play</h2>
    <List items={howToPlayItems} />
  </div>
);

export default About;
