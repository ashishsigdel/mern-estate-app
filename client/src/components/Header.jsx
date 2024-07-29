import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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
  return (
    <header className="bg-slate-400 shadow-md">
      <div className="flex justify-between items-center p-3 mx-auto max-w-6xl">
        <Link to="/">
          <h1 className="font-bold text-md sm:text-lg flex flex-wrap">
            <span className="text-slate-500">Mero</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center "
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-32 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-700" />
          </button>
        </form>
        <ul className="flex gap-4 ">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 transition hover:text-slate-500 duration-500">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 transition hover:text-slate-500 duration-500">
              About
            </li>
          </Link>
          <Link to="/create-listing">
            <li className="hidden sm:inline text-slate-700 transition hover:text-slate-500 duration-500">
              Create
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="w-7 h-7 object-cover rounded-full"
              />
            ) : (
              <li className="text-slate-700 transition hover:text-slate-500 duration-500">
                Sign In
              </li>
            )}
          </Link>
          {currentUser && (
            <div
              onClick={handleUserSignOut}
              className="text-slate-700 transition hover:text-slate-500 duration-500 flex items-center justify-center cursor-pointer"
            >
              <IoLogOutOutline className="text-2xl" />
            </div>
          )}
        </ul>
      </div>
    </header>
  );
}
