import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItemProfile({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] ">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="result-banner"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-500 "
        />
        <div className=" p-3">
          <p className="font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="text-green-800" />
            <p className="text-xs truncate text-slate-500">{listing.address}</p>
          </div>
          <div className="mt-1">
            <p className="text-xs text-slate-600 line-clamp-2">
              {listing.description}
            </p>
          </div>
          <div className="my-3 flex justify-between">
            <p className="text-slate-700 font-semibold">
              {"Rs. "}
              {listing.discountPrice
                ? `${(
                    listing.regularPrice - listing.discountPrice
                  ).toLocaleString()}`
                : `${listing.regularPrice.toLocaleString()}`}
              {listing.type === "rent" ? " / month" : ""}
            </p>
            {listing.offer ? (
              <p className="bg-green-800 text-white rounded p-1 text-xs shadow-lg">
                {`-${(
                  (listing.discountPrice / listing.regularPrice) *
                  100
                ).toFixed(0)}% off`}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex gap-3">
            <p className="text-sm text-slate-600 font-semibold">
              {listing.bedrooms === 1
                ? `${listing.bedrooms} bed`
                : `${listing.bedrooms} beds`}
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              {listing.bathrooms === 1
                ? `${listing.bathrooms} bed`
                : `${listing.bathrooms} beds`}
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              {listing.parking ? "Parking" : "No Parking"}
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              {listing.furnished ? "Furnished" : "No Furnished"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
