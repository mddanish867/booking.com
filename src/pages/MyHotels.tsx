import { Link } from "react-router-dom";

// import { BsBuilding, BsMap } from "react-icons/bs";
// import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useGetHotelByIdQuery } from "../Api/hotelAPI";
import MainLoader from "../Helper/MainLoader";
import Header from "../components/Header";
import Footer from "../components/Footer";
const MyHotels = () => {
  const loggedInUser = sessionStorage.getItem("user-id");
  const { data, isLoading } = useGetHotelByIdQuery(loggedInUser);
  var dataArray: any = [];
  if (!data || isLoading) {
    return <MainLoader />;
  }
  if (!Array.isArray(data)) {
    // Handle the case where data is not an array
    dataArray = data ? [data] : [];
  }
  return (
    <>
      <Header />
      <div className="container space-y-5 mt-10 mb-10">
        <span className="flex justify-between">
          <h1 className="text-3xl font-bold">My Hotels</h1>
          <Link
            to="/addhotel"
            className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
          >
            Add Hotel
          </Link>
        </span>
        {!isLoading ? (
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-1 lg:grid-col-1 md:grid-cols-1 sm:grid-col-1">
            {data.map((hotel: any, index: number) => (
              <div
                key={index}
                data-testid="hotel-card"
                className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
              >
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="grid grid-cols-5 gap-2">
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                    {/* <BsMap className="mr-1" /> */}
                    {hotel.city}, {hotel.country}
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                    {/* <BsBuilding className="mr-1" /> */}
                    {hotel.type}
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                    {/* <BiMoney className="mr-1" /> */}£{hotel.pricePerNight}{" "}
                    per night
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                    {/* <BiHotel className="mr-1" /> */}
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                    {/* <BiStar className="mr-1" /> */}
                    {hotel.starRating} Star Rating
                  </div>
                </div>
                <span className="flex justify-end">
                  <Link
                    to={`/edit-hotel/${hotel._id}`}
                    className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                  >
                    View Details
                  </Link>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <MainLoader />
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyHotels;
