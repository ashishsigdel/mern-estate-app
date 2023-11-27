import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className=" flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">
              {listing.name.toLowerCase()} :-{" "}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            className="w-full p-1 rounded-lg border"
            placeholder="Write a message here..."
            value={message}
            onChange={onChange}
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-green-700 text-white uppercase rounded-lg p-3 text-center hover:bg-green-900 transition duration-500"
          >
            Sent Message
          </Link>
        </div>
      )}
    </>
  );
}
