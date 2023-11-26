import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import Listing from "../../../api/models/listing.model";

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleUserSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-7 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-5">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          ref={fileRef}
          type="file"
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt="profile"
          className="rounded-full w-24 h-24 object-cover mx-auto mt-6 hover:scale-105 transition duration-500"
        />
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-500">Error Image Upload!</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-800">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">Image upload successfully.</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="p-3 border rounded-lg "
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="p-3 border rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-3 border rounded-lg "
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-800 p-3 text-white uppercase font-semibold rounded-lg disabled:bg-slate-600 hover:bg-slate-900 transition duration-500 "
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to="/create-listing"
          className="bg-blue-700 text-white p-3 rounded-lg uppercase font-semibold text-center hover:opacity-90 transition duration-500"
        >
          create listing
        </Link>
      </form>
      <div className="flex justify-between p-3">
        <span
          onClick={handleDeleteUser}
          className="text-red-600 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleUserSignOut}
          className="text-red-600 cursor-pointer"
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700 text-center">{error ? error : ""}</p>
      <p className="text-green-700 text-center">
        {updateSuccess ? "Update successfully" : ""}
      </p>
      <button onClick={handleShowListings} className="text-green-700 w-full ">
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="">
          <h1 className="text-xl font-semibold text-center mb-5 ">
            Your listings:{" "}
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="gap-4 flex border rounded-lg p-3 justify-between items-center my-2"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing-image-cover"
                  className="w-16 h-16 object-contain rounded-lg"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-700 font-semibold flex-1 hover:underline transition duration-500 truncate"
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col ">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase text-sm"
                >
                  Delete
                </button>
                <button className="text-green-700 uppercase text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
