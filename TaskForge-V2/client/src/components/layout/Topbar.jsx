import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">

          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2"
          />

        </div>

        {/* Notification */}
        <button className="text-xl hover:text-blue-600">
          <FaBell />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">

          <FaUserCircle className="text-3xl text-gray-600" />

          <div>

            <p className="font-semibold">
              Atharv
            </p>

            <p className="text-xs text-gray-500">
              Student
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;