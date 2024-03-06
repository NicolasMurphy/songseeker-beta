const About = () => (
  <div className="container mx-auto text-center px-6 py-8">
    <h1 className="text-4xl font-bold mb-8">About</h1>
    <p className="mb-10 text-lg">
      SongSeeker is a music education geography game! Featuring music from over
      50 countries!
    </p>
    <h2 className="text-3xl font-bold mb-6">How to Play</h2>
    <ol className="list-decimal text-lg text-left mx-auto mb-12">
      <li className="mb-4">
        Listen closely to each track — make sure your volume is turned up!
      </li>
      <li className="mb-4">
        Guess the country of origin on the interactive map.
      </li>
      <li>
        Collect points for accuracy! The closer your guess, the higher your
        score.
      </li>
    </ol>
  </div>
);

export default About;
