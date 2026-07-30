import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authService";
import AuthInput from "./AuthInput";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !formData.name ||
      !formData.email ||
      !formData.college ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      setLoading(true);
  
      const response = await signupUser({
        name: formData.name,
        email: formData.email,
        college: formData.college,
        password: formData.password,
      });
  
      alert(response.message);
  
      navigate("/login");
  
    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <AuthInput
        label="Full Name"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
      />

      <AuthInput
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <AuthInput
        label="College"
        name="college"
        placeholder="Enter your college"
        value={formData.college}
        onChange={handleChange}
      />

      <AuthInput
        label="Password"
        type="password"
        name="password"
        placeholder="Create password"
        value={formData.password}
        onChange={handleChange}
      />

      <AuthInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}

export default SignupForm;