import { Link } from "react-router-dom";

const Hero = () => {
  const token = sessionStorage.getItem("jwtToken");
  return (
    <div className="bg-blue-800 pb-16 flex flex-col md:flex-row md:items-center">
      {token ? (
        <div className="container mx-auto flex flex-col gap-2 md:ml-12 mt-12">
          <h1 className="text-5xl text-white font-extrabold mt-36 md:mt-0">
            Find your next stay
          </h1>
          <p className="text-2xl text-white">
            Search low prices on hotels, homes and much more...
          </p>
        </div>
      ) : (
        <div className="container mx-auto flex flex-col gap-2 md:ml-12">
          <h1 className="text-5xl text-white font-extrabold mt-36 md:mt-0">
            Sign in, save money
          </h1>
          <p className="text-2xl text-white">
            Save 10% or more at participating properties - just look for the
            blue Genius label.
          </p>
          <Link
            to="/signin"
            className="flex mt-5 min-h-12 bg-blue-600 items-center text-white px-3 font-medium rounded hover:bg-blue-500 md:w-40"
          >
            Sign in or register
          </Link>
        </div>
      )}
      {!token && (
        <div className="mt-6 md:mt-0 md:ml-6 md:mr-12 flex-shrink-0">
          <img
            className="h-80 w-full md:w-96"
            src="https://q-xx.bstatic.com/xdata/images/xphoto/300x300/316543397.png?k=c42a7cb04035fb44ee49b1f539e6b2bfb745955a8fe8df2db662c938077cd021&o="
            alt="header imgae"
          />
        </div>
      )}
    </div>
  );
};

export default Hero;
