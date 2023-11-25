import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Only image with max 2MB acceptable.");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images for one listing.");
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleImageRemove = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="max-w-4xl p-5 mx-auto">
      <h1 className="text-3xl font-semibold text-center">Create a Listing</h1>

      <form className="flex flex-col sm:flex-row gap-3 my-5">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="p-3 rounded-lg border-gray-600"
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              id="description"
              className="p-3 rounded-lg border-gray-600"
              required
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              className="p-3 rounded-lg border-gray-600"
              required
            />
          </div>
          <div className="my-4 flex gap-5 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                id="bedrooms"
                className="p-3 rounded-lg w-20"
                required
              />
              <p>Bed Rooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                id="bathrooms"
                className="p-3 rounded-lg w-20"
                required
              />
              <p>Bath Rooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                id="regularPrice"
                className="p-3 rounded-lg "
                required
              />
              <div className="flex flex-col">
                <p>Regular Price</p>
                <span className="text-xs text-center">($ / month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                id="discountedPrice"
                className="p-3 rounded-lg "
                required
              />
              <div className="flex flex-col">
                <p>Discounted Price</p>
                <span className="text-xs text-center">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div>
            <div className="flex gap-3">
              <h1 className="font-semibold">Images: </h1>
              <span>The first image will be the cover(max 6)</span>
            </div>
            <div className="flex gap-3 mt-5">
              <input
                type="file"
                id="images"
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 rounded-lg border border-gray-400"
                accept="image/*"
                multiple
              />
              <button
                onClick={handleImageSubmit}
                type="button"
                className="p-3 text-green-700 border uppercase border-green-700 rounded-lg hover:shadow-lg"
              >
                {uploading ? "Uploading..." : "upload"}
              </button>
            </div>
          </div>
          <p className="text-red-600 text-sm">
            {imageUploadError && imageUploadError}{" "}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between border border-slate-400 shadow-md my-1 rounded-lg p-1"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg mx-5"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="text-red-700 px-3 my-5 uppercase hover:shadow-lg rounded-lg transition duration-500"
                >
                  delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition duration-500">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
