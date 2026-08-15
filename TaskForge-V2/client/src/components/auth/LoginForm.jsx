import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import AuthInput from "./AuthInput";

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // Save JWT Token
      localStorage.setItem("token", response.token);

      // Save User Details
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);

      alert(response.message);

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      // Navigate to Dashboard
      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
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

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>
  );
}

export default LoginForm;