import logo from "./Images/logo.svg";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <img
        src={logo}
        alt="A logo of a location pin with music notes inside it"
        className="mx-auto w-48 mb-4"
      />
      <h1 className="text-5xl font-bold mb-8">SongSeeker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/legacy" className="btn btn-primary w-full h-20 text-xl flex items-center justify-center">
          Original Version
        </a>
        <a href="/new" className="btn btn-secondary w-full h-20 text-xl flex items-center justify-center">
          New Version (in progress)
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
