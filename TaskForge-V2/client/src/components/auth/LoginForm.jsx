import { useState } from "react";
import { Link } from "react-router-dom";
import AuthInput from "./AuthInput";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Backend API will be connected later
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <AuthInput
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <AuthInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      <div className="flex justify-end">
        <div className="flex items-center justify-between">

    <label className="flex items-center gap-2">

        <input
            type="checkbox"
            className="w-4 h-4"
            />

            <span className="text-sm">
            Remember Me
            </span>

        </label>

        <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
        >
            Forgot Password?
        </Link>

        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Login
      </button>

    </form>
  );
}

export default LoginForm;