import { useState } from "react";
import { useForm } from "react-hook-form";
import SignInDialogComponent from "../../pages/Account/SignInDialogComponent";
import { useGetUserAddressQuery } from "../../Api/authApi";
import MainLoader from "../../Helper/MainLoader";
import Cookies from 'js-cookie';

var loggedInUser = Cookies.get("user-id");
type Props = {
  currentUser: string;
  pricePerNight: number;
  numberOfNights: number;
};
type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
};
const BookingForm = ({ pricePerNight, numberOfNights }: Props) => {
  const searchParams = {
    userId: loggedInUser,
  };

  const { data, isLoading, isError } = useGetUserAddressQuery(searchParams);
  
  const { handleSubmit, register } = useForm<BookingFormData>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) {
    return <MainLoader />;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  const dataArray = Array.isArray(data) ? data : [data];

  const handleOpenDialog = (e:any) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <form
      //   onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 rounded-lg border border-slate-300 p-5 mx-2"
    >
      <span className="text-xl font-semibold">Confirm Your Details</span>
      <button
        className="bg-blue-500 h-10 hover:bg-blue-600 items-start md:max-w-[20%] text-white"
        onClick={handleOpenDialog}
      >
        Add New Address
      </button>
      {dataArray.map((userAddress: BookingFormData, index:number) => (
        <div className="grid grid-cols-2 gap-6" key={index}>
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 font-normal"
              type="text"
              readOnly
              disabled
              defaultValue={userAddress.firstName}
              {...register("firstName")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 font-normal"
              type="text"
              readOnly
              disabled
              defaultValue={userAddress.lastName}
              {...register("email")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 font-normal"
              type="text"
              readOnly
              disabled
              defaultValue={userAddress.email}
              {...register("email")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Mobile
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 font-normal"
              type="text"
              readOnly
              disabled
              defaultValue={userAddress.mobile}
              {...register("mobile")}
            />
          </label>
        </div>
      ))}

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: £{(numberOfNights * pricePerNight).toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      {/* <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div> */}

      {/* <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div> */}
      <SignInDialogComponent open={isDialogOpen} onClose={handleCloseDialog} />
    </form>
  );
};
export default BookingForm;
