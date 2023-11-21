import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-300 shadow-md">
      <div className="flex justify-between items-center p-3 mx-auto max-w-6xl">
        <h1 className="font-bold text-md sm:text-lg flex flex-wrap">
          <span className="text-slate-500">Mern</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-32 sm:w-64"
          />
          <FaSearch className="text-slate-700"/>
        </form>
        <ul className="flex gap-4 ">
            <Link to='/'>
            <li className="hidden sm:inline text-slate-700 transition hover:text-slate-400 duration-500">Home</li>
            </Link>
            <Link to='/about'>
            <li className="hidden sm:inline text-slate-700 transition hover:text-slate-400 duration-500">About</li>
            </Link>
            <Link to='/sign-in'>
            <li className="text-slate-700 transition hover:text-slate-400 duration-500">Sign In</li>
            </Link>
        </ul>
      </div>
    </header>
  );
}
