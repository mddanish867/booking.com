import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="bg-blue-800 py-4">
      <div className="mx-auto flex justify-between">
        <span className="text-2xl text-white font-semibold tracking-tight mx-20">
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
          style={{marginRight:"93px"}}
            to="/signin"
            className="mr-24 flex bg-white items-center text-blue-600 px-3 font-medium rounded hover:bg-gray-100"
          >
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Header;
