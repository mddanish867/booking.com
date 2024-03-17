import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="bg-blue-800 py-4">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-semibold tracking-tight">
          <Link to="/">Booking.com</Link>
        </span>
        <span className="flex space-x-2">
        <Link
            to="/signup"
            className="flex  items-center text-white px-3 font-medium rounded hover:bg-gray-100 hover:text-blue-600"
          >
            List your property
          </Link>
          <Link
            to="/register"
            className="flex bg-white items-center text-blue-600 px-3 font-medium rounded hover:bg-gray-100"
          >
            Register
          </Link>
          <Link
            to="/signin"
            className="flex bg-white items-center text-blue-600 px-3 font-medium rounded hover:bg-gray-100"
          >
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Header;
