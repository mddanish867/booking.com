import React from "react";
import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";

interface LoggedInPopup {
  open: boolean;
  onClose: () => void;
}

const LoggedInPopup: React.FC<LoggedInPopup> = ({ open, onClose }) => {


  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-8 max-w-md w-full rounded-lg relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl mb-4 text-center text-blue-500 font-bold mt-15">Booking Clon.com</h2>
          <h3 className="font-bold text-2xl text-center">Sign in, save money</h3>
          <p className="text-center text-xl mt-5 mb-5">
            Sign in to <b>save 10% or more</b> with a free Booking.com
            membership
          </p>
          <Link
            type="submit"
            className="container bg-blue-500 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-blue-700 max-w-[100%] text-center"
            to={"/signin"}
            onClick={onClose}
          >
            Sign in or register
          </Link>
        </div>
      </div>
    </Dialog>
  );
};

export default LoggedInPopup;
