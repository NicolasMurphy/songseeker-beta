import AddTrack from "./AddTrack";

function Footer({ firestore }) {
  return (
    <>
      <footer className="bottom-0 footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav>
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
