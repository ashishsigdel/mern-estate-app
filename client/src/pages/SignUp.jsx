import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign UP</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className="p-3 rounded-lg border"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="p-3 rounded-lg border"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 rounded-lg border"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-800 p-3 text-white uppercase font-semibold rounded-lg disabled:bg-slate-600 hover:bg-slate-900 transition duration-500 "
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex mt-5 gap-2">
        <p className="">Already have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700 cursor-pointer">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}
