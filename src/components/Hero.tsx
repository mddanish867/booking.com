import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-blue-800 pb-16 flex flex-row">
      <div className="container mx-auto flex flex-col gap-2">
        <h1 className="text-5xl text-white font-extrabold mt-36">
          Sign in, save money
        </h1>
        <p className="text-2xl text-white">
          Save 10% or more at participating properties - just look for the blue
          Genius label.
        </p>
        <Link
          to="/signin"
          className="flex mt-5 min-h-12 bg-blue-600 items-center text-white px-3 font-medium rounded hover:bg-blue-500 w-40"
        >
          Sign in or register
        </Link>
      </div>
      <div className="mt-28 mr-6">
        <img className="h-80 w-96 mr-48" src="https://q-xx.bstatic.com/xdata/images/xphoto/300x300/316543397.png?k=c42a7cb04035fb44ee49b1f539e6b2bfb745955a8fe8df2db662c938077cd021&o=" alt="header imgae"></img>
      </div>
    </div>
  );
};
export default Hero;
