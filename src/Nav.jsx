import React from "react";
import HighScoreList from "./HighScoreList";
import About from "./About";
import AddTrack from "./AddTrack";

function Nav({ database, firestore }) {
  return (
    <div className="text-center py-4">

      <label htmlFor="my-modal-1" className="btn btn-outline btn-sm mx-2">
        scores
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

      <label htmlFor="my-modal-2" className="btn btn-outline btn-sm mx-2">
        about
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
          <About />
        </div>
      </div>
      <label htmlFor="my-modal-4" className="btn btn-outline btn-sm mx-2">
        add track
      </label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-4"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <AddTrack firestore={firestore} />
        </div>
      </div>
    </div>
  );
}

export default Nav;
