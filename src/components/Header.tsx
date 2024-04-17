import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const Header = () => {
  const isLoggedIn = Cookies.get('jwtToken');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);

  
  useEffect(() => {
    // method to decode the token
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken) {
      const tokenParts = jwtToken.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      setCurrentUser(payload.email);
    }    
  },); // Empty dependency array ensures this effect runs only once
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // delete cookies
  function deleteAuthToken(name:string) {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=None`;
  }

  // handle sign out and remove session storage
  const handleSignout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("user-id");
    deleteAuthToken("jwtToken");
    deleteAuthToken("user-id");
    navigate("/");
  };

  return (
    <div className="bg-blue-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl text-white font-semibold tracking-tight">
          <Link to="/">Booking.com</Link>
        </span>
        <div className="flex items-center space-x-4">         
            <Link 
              to={isLoggedIn ? "/addhotel" : "signin"}
              className="hidden md:inline-block text-white px-4 py-2 rounded font-medium hover:bg-blue-900"
            >
              List your property
            </Link>         

          {isLoggedIn ? (
            <>
              <div className="relative inline-block text-left">
                <button
                  id="dropdownAvatarNameButton"
                  onClick={toggleDropdown}
                  className="flex items-center text-sm font-medium text-white hover:bg-blue-900 px-4 py-2"
                  type="button"
                >
                  <span className="sr-only">Your account</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="user photo"
                  />
                  Your account
                </button>

                {/* Dropdown menu */}
                <div
                  id="dropdownAvatarName"
                  className={`${isDropdownOpen ? "block" : "hidden"} z-10 absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg`}
                >
                  <div className="px-4 py-3 text-sm text-gray-900">
                    <div className="font-medium text-yellow-600">Genius Level 1</div>
                    <div className="truncate">{currentUser}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link to="/myhotels" className="block px-4 py-2 hover:bg-gray-100">
                        My Hotel
                      </Link>
                    </li>
                    <li>
                      <Link to="/booking" className="block px-4 py-2 hover:bg-gray-100">
                        My Booking
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Earnings
                      </a>
                    </li>
                  </ul>
                  <div className="py-2">
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleSignout}
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex">
                <Link
                  to="/signin"
                  className="bg-white text-blue-600 px-3 py-1 rounded font-medium hover:bg-gray-100"
                >
                  Register
                </Link>
                <Link
                  to="/signin"
                  className="bg-white text-blue-600 px-5 ml-2 py-1 rounded font-medium hover:bg-gray-100"
                >
                  Sign in
                </Link>
              </div>
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="flex items-center text-white text-xl focus:outline-none"
                >
                  {isMobileMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
                <div
                  className={`${isMobileMenuOpen ? "right-0" : "right-full"} md:hidden bg-white px-2 mt-16 pb-3 space-y-1 sm:px-3 absolute top-0 transition-all duration-300`}
                >
                  <Link
                    to="/signin"
                    className="block px-3 py-2 mt-10 rounded-md text-base font-medium text-blue-900 hover:bg-blue-900 hover:text-white"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-900 hover:text-white"
                  >
                    Register
                  </Link>
                  <Link
                    to="/managehotelform"
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-900 hover:text-white"
                  >
                    List your property
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
