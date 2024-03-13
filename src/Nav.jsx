import HighScoreList from "./HighScoreList";
import Donate from "./Donate";
import About from "./About";

function Nav({ database }) {
  return (
    <nav className="text-center py-4">
      <button
        className="btn btn-outline btn-sm mx-2 uppercase"
        onClick={() => document.getElementById("scores").showModal()}
      >
        Scores
      </button>
      <dialog id="scores" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <HighScoreList database={database} />
        </div>
      </dialog>

      <button
        className="btn btn-outline btn-sm mx-2 uppercase"
        onClick={() => document.getElementById("about").showModal()}
      >
        About
      </button>
      <dialog id="about" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <About />
        </div>
      </dialog>

      <button
        className="btn btn-outline btn-secondary btn-sm mx-2 uppercase"
        onClick={() => document.getElementById("donate").showModal()}
      >
        Donate
      </button>
      <dialog id="donate" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <Donate />
        </div>
      </dialog>
    </nav>
  );
}

export default Nav;
