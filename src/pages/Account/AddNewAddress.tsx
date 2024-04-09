import { useState } from "react";
import { useAddUserAddressMutation } from "../../Api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const newAddressData = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
};
const AddNewAddress = () => {
  const [addUserAddressMutation] = useAddUserAddressMutation();
  const [newAddressInputs, setNewAddressInputs] = useState(newAddressData);
  const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>(
    sessionStorage.getItem("user-id") ?? undefined
  );
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDefault(e.target.checked);
  };

  // get input elements
  // get input elements
  const handleUserAddressInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const inputValue = name === "isDefault" ? isDefault : value;

    setNewAddressInputs((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  // Submit button functionality
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (loggedInUserId) {
      formData.append("Userid", loggedInUserId);
    }
    formData.append("firstName", newAddressInputs.firstName);
    formData.append("lastName", newAddressInputs.lastName);
    formData.append("Email", newAddressInputs.email);
    formData.append("Mobile", newAddressInputs.mobile);
    formData.append("isDefault", isDefault.toString());

    try {
      const response = await addUserAddressMutation(formData);
      if (response) {
        setLoading(false);
        toast.success("Address added successfully!"); // Display success toast
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add address."); // Display error toast
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }} // Adjust zIndex as per your requirement
      />
      <h1 className="text-1xl font-bold text-start mt-5 mb-3">
        Add New Address
      </h1>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="mb-5 mx-auto max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-4 py-2 border rounded-md border-zinc-300"
      >
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            First Name:
          </label>
          <input
            required
            name="firstName"
            value={newAddressInputs.firstName}
            onChange={handleUserAddressInput}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Last Name:
          </label>
          <input
            required
            name="lastName"
            value={newAddressInputs.lastName}
            onChange={handleUserAddressInput}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Email:
          </label>
          <input
            required
            name="email"
            value={newAddressInputs.email}
            onChange={handleUserAddressInput}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Mobile:
          </label>
          <input
            required
            name="mobile"
            value={newAddressInputs.mobile}
            onChange={handleUserAddressInput}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>
        <div className="mb-4 flex flex-row w-full justify-start items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            <div className="flex flex-row text-sm items-center gap-1 text-gray-700">
              <input
                name="isDefault"
                type="checkbox"
                checked={isDefault} // Use checked attribute for controlling the checkbox
                onChange={handleCheckboxChange}
                className="mr-2 focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
              />
              <label
                htmlFor="isDefault"
                className="flex-shrink-0 whitespace-nowrap"
              >
                Make default address
              </label>
            </div>
          </div>
        </div>

        <span className="flex justify-end">
          <button
            type="submit"
            className="container bg-blue-500  text-white p-2 font-bold hover:bg-blue-600 text-xl disabled:bg-blue-700 max-w-[50%]"
            // disabled={!Object.keys(errors).length ? false : true}
          >
            Save
          </button>
        </span>
      </form>
    </>
  );
};

export default AddNewAddress;
