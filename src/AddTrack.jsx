import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";

const AddTrack = ({ firestore }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    country: "",
    description: "",
    spotifyLink: "",
    submittedBy: "",
  });

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Update state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(firestore, "tracks"), formData);
      console.log("Document written with ID: ", docRef.id);
      setShowToast(true);
      // Reset form fields
      setFormData({
        spotifyLink: "",
        country: "",
        description: "",
        submittedBy: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      className="form-control w-full max-w-xs mx-auto"
      onSubmit={handleSubmit}
    >
      <label className="label">
        <span className="label-text">Spotify link</span>
      </label>
      <input
        className="input input-bordered input-info w-full max-w-xs"
        type="url"
        name="spotifyLink"
        value={formData.spotifyLink}
        onChange={handleChange}
        required
        placeholder=""
        maxLength={250}
      />

      <label className="label">
        <span className="label-text">Country</span>
      </label>
      <input
        className="input input-bordered input-info w-full max-w-xs"
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
        placeholder=""
        maxLength={100}
      />

      <label className="label">
        <span className="label-text">Description (optional)</span>
      </label>
      <textarea
        rows="4"
        className="textarea textarea-info"
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Please include a source link if the description is derived from an external source!"
        maxLength={2000}
      />

      <label className="label">
        <span className="label-text">Username (optional)</span>
      </label>
      <input
        className="input input-bordered input-info w-full max-w-xs"
        type="text"
        name="submittedBy"
        value={formData.submittedBy}
        onChange={handleChange}
        placeholder=""
        maxLength={30}
      />
      <br />

      {!showToast && (
        <>
          <button
            type="submit"
            className="my-2 btn btn-info"
          >
            Submit
          </button>
        </>
      )}

      {showToast && (
        <div className="card">
          <div className="card-body alert alert-success text-center">
            <p>Thanks for submitting a track!</p>
            <p>Your track will be reviewed and added to the game shortly.</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddTrack;
