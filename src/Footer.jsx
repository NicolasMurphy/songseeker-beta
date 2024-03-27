import { useState } from "react";
import AddTrack from "./AddTrack";

function Footer({ firestore }) {
  const [isAddTrackModalVisible, setIsAddTrackModalVisible] = useState(false);
  return (
    <>
      <footer className="bottom-0 footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav>
          {/* <button
            className="btn btn-outline btn-sm mx-2 uppercase"
            onClick={() => document.getElementById("add_track").showModal()}
          >
            Add Track
          </button>
          <dialog id="add_track" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <AddTrack firestore={firestore} />
            </div>
          </dialog> */}

          <button
            className="btn btn-outline btn-sm mx-2 uppercase"
            onClick={() => setIsAddTrackModalVisible(true)}
          >
            Add Track
          </button>
          {isAddTrackModalVisible && (
            <dialog open className="modal" id="add_track">
              <div className="modal-box">
                <form method="dialog">
                  <button
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => setIsAddTrackModalVisible(false)}
                  >
                    ✕
                  </button>
                </form>
                <AddTrack firestore={firestore} />
              </div>
            </dialog>
          )}
        </nav>
        <aside>
          <p>
            Copyright © 2024 - Website by{" "}
            <span>
              <a
                href="https://nicolasmurphy.com"
                target="_blank"
                rel="noreferrer"
              >
                Nicolas Murphy
              </a>
            </span>
          </p>
        </aside>
      </footer>
    </>
  );
}

export default Footer;
