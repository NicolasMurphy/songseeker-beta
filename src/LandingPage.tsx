import logo from "./Images/logo.svg";

const LandingPage = () => {
  return (
    // <div className="flex flex-col items-center min-h-screen p-6">
    //   <img
    //     src={logo}
    //     alt="A logo of a location pin with music notes inside it"
    //     className="mx-auto w-48 mb-4"
    //   />
    //   <h1 className="text-5xl font-bold mb-8">SongSeeker</h1>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <a href="/legacy" className="btn btn-primary w-full h-20 text-xl flex items-center justify-center">
    //       Original Version
    //     </a>
    //     <a href="/new" className="btn btn-secondary w-full h-20 text-xl flex items-center justify-center">
    //       New Version (in progress)
    //     </a>
    //   </div>
    // </div>
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Sorry!</h2>
          <p>
            SongSeeker isn't working right now because of some changes Spotify
            made to their API.
          </p>
          <p>
            I don't plan on finding a solution anytime soon, so it will be down
            for the foreseeable future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
