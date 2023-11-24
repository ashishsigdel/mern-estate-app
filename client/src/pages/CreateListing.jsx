import React from "react";

export default function CreateListing() {
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
            <div className="flex gap-2 items-center" >
              <input type="number" min={1} id="bedrooms" className="p-3 rounded-lg w-20" required/>
              <p>Bed Rooms</p>
            </div>
            <div className="flex gap-2 items-center" >
              <input type="number" min={1} id="bathrooms" className="p-3 rounded-lg w-20" required/>
              <p>Bath Rooms</p>
            </div>
            <div className="flex gap-2 items-center" >
              <input type="number" min={1} id="regularPrice" className="p-3 rounded-lg " required/>
              <div className="flex flex-col">
              <p>Regular Price</p>
              <span className="text-xs text-center">($ / month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center" >
              <input type="number" min={1} id="discountedPrice" className="p-3 rounded-lg " required/>
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
            <div className="flex gap-3 my-5">
            <input type="file" id="images" className="p-3 rounded-lg border border-gray-400" accept="image/*" multiple/>
            <button className="p-3 text-green-700 border border-green-700 rounded-lg">Upload</button>
            </div>
          </div>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  );
}
