import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-5">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 object-cover mx-auto my-6"
        />
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="p-3 border rounded-lg "
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="p-3 border rounded-lg "
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-3 border rounded-lg "
        />
        <button className="bg-slate-800 p-3 text-white uppercase font-semibold rounded-lg disabled:bg-slate-600 hover:bg-slate-900 transition duration-500 ">
          Update
        </button>
      </form>
      <div className="flex justify-between p-3">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
