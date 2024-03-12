import HighScoreList from "./HighScoreList";
import Donate from "./Donate";
import About from "./About";

function Nav({ database }) {
  return (
    <nav className="text-center py-4">
      <label htmlFor="my-modal-1" className="btn btn-outline btn-sm mx-2 uppercase">
        Scores
      </label>
      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-1"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <HighScoreList database={database} />
        </div>
      </div>

      <label htmlFor="my-modal-5" className="btn btn-outline btn-sm mx-2 uppercase">
        About
      </label>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-5"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <About />
        </div>
      </div>

      <label
        htmlFor="my-modal-2"
        className="btn btn-outline btn-secondary btn-sm mx-2 uppercase"
      >
        Donate
      </label>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-2"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Donate />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
