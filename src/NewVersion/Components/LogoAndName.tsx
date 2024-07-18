import logo from "../../Images/logo.svg";

const LogoAndName: React.FC = () => {
  return (
    <>
      <img
        src={logo}
        alt="A logo of a location pin with music notes inside it"
        className="mx-auto w-32"
      />
      <h1 className="text-4xl font-bold mb-4">SongSeeker</h1>
    </>
  );
};

export default LogoAndName;
