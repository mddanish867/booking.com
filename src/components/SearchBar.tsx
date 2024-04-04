import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  // const [hotelId, setHotelId] = useState<string>(search.hotelId);
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/searchresults");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 mx-4 p-1 flex flex-col md:flex-row bg-orange-300 rounded-md shadow-md"
    >
      <div className="flex items-center bg-white p-2 mr-2 w-full md:w-96 rounded">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className=" text-md w-full focus:outline-none h-10"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row bg-white p-2 gap-2 w-full md:w-80 rounded">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full p-2 focus:outline-none cursor-pointer"
        />
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="w-full p-2 focus:outline-none cursor-pointer"
        />
      </div>

      <div className="flex flex-col md:flex-row bg-white p-2 gap-2 w-full md:w-80 md:ml-2 rounded">
        <label className="flex items-center">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold h-10"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="flex items-center">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold h-10"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className="flex rounded md:ml-2">
        <button className="md:w-28 bg-blue-600 text-white p-3 font-semibold text-xl hover:bg-blue-500 rounded">
          Search
        </button>
        <button className="w-full md:w-auto bg-red-600 text-white p-3 font-semibold text-xl hover:bg-red-500 md:ml-2 rounded">
          Clear
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
