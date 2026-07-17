import { useState } from "react";
import AuthInput from "./AuthInput";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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

    console.log(formData);

    // Backend API will be connected later
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Create Account
      </button>

    </form>
  );
}

export default SignupForm;