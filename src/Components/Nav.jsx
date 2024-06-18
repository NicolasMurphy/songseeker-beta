import { useState } from 'react';
import HighScoreList from "./Modals/HighScoreList";
import Donate from "./Modals/Donate";
import About from "./Modals/About";

function Nav({ database }) {
  const [isScoresVisible, setIsScoresVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isDonateVisible, setIsDonateVisible] = useState(false);

  return (
    <nav className="text-center py-4">
      <button
        className="btn btn-outline btn-sm mx-2 uppercase"
        onClick={() => setIsScoresVisible(true)}
      >
        Scores
      </button>
      {isScoresVisible && (
        <dialog open className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setIsScoresVisible(false)}>
                ✕
              </button>
            </form>
            <HighScoreList database={database} />
          </div>
        </dialog>
      )}

      <button
        className="btn btn-outline btn-sm mx-2 uppercase"
        onClick={() => setIsAboutVisible(true)}
      >
        About
      </button>
      {isAboutVisible && (
        <dialog open className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setIsAboutVisible(false)}>
                ✕
              </button>
            </form>
            <About />
          </div>
        </dialog>
      )}

      <button
        className="btn btn-outline btn-secondary btn-sm mx-2 uppercase"
        onClick={() => setIsDonateVisible(true)}
      >
        Donate
      </button>
      {isDonateVisible && (
        <dialog open className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setIsDonateVisible(false)}>
                ✕
              </button>
            </form>
            <Donate />
          </div>
        </dialog>
      )}
    </nav>
  );
}

export default Nav;
