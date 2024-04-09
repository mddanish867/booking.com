import React from "react";
import { Dialog } from "@headlessui/react";
import AddNewAddress from "./AddNewAddress";

interface SignInDialogComponent {
  open: boolean;
  onClose: () => void;
}

const SignInDialogComponent: React.FC<SignInDialogComponent> = ({ open, onClose }) => {


  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 max-w-md w-full rounded-lg relative">
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
          
          <AddNewAddress/>
          
        </div>
      </div>
    </Dialog>
  );
};

export default SignInDialogComponent;
