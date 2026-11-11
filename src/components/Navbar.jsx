// import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import RequestDetails from "../pages/RequestDetails";
import Admin from "../pages/Admin";

const Navbar = () => {
  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("refreshToken");
  //   localStorage.removeItem("role");

  //   // navigate
  //   navigate("/");
  // };
  return (
   <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
  {/* Logo */}
  <Link
    to="/dashboard"
    className="text-2xl font-bold tracking-tight text-slate-900"
  >
    Service<span className="text-blue-600">Hub</span>
  </Link>

  {/* Navigation */}
  <div className="hidden items-center gap-2 md:flex">
    <Link
      to="/dashboard"
      className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
    >
      Dashboard
    </Link>

    <Link
      to="/create-request"
      className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
    >
      Create Request
    </Link>
    <Link
      to="/admin"
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      Admin Panel
    </Link>
    <Link
      to="/"
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      Login
    </Link>
  </div>

  {/* Mobile */}
  <div className="flex items-center gap-2 md:hidden">
    <Link
      to="/dashboard"
      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
    >
      Dashboard
    </Link>

    <Link
      to="/create-request"
      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
    >
      Create
    </Link>
  </div>
</nav>
  );
};

export default Navbar;
