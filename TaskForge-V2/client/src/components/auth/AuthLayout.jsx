import { Link } from "react-router-dom";

function AuthLayout({ title, subtitle, children, footerText, footerLink, footerLinkText }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100">

      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-12">

        <h1 className="text-5xl font-extrabold">
          TaskForge
        </h1>

        <p className="mt-6 text-xl text-center max-w-md leading-relaxed">
          Manage Projects.
          <br />
          Collaborate with Teams.
          <br />
          Build Faster.
        </p>

      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center p-8">

        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-700">
              TaskForge
            </h1>
          </div>

          <h2 className="text-3xl font-bold text-center">
            {title}
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            {subtitle}
          </p>

          {children}

          <p className="text-center mt-8 text-gray-600">
            {footerText}{" "}
            <Link
              to={footerLink}
              className="text-blue-600 hover:underline font-semibold"
            >
              {footerLinkText}
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;