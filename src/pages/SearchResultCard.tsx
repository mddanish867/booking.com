import { Link } from "react-router-dom";
import { hotelModel } from "../Interfaces/hotelModel";
import { AiFillStar } from "react-icons/ai";
type Props = {
  hotel: hotelModel;
};
const SearchResultsCard = ({ hotel }: Props) => {
  if (!hotel || !hotel.images || hotel.images.length === 0) {
    // Return null or a placeholder component if hotel or imageUrls are undefined or empty
    return null;
  }  

  return (
    <>
      <div className="w-[95%] grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-200 rounded-lg p-10 gap-8">
        <div className="w-[200px] h-[200px]">
          <img
            src={hotel.images[0]}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="grid grid-rows-[1fr_2fr_1fr] -mt-8 ">
          <div className="flex flex-1 items-center">
            <Link
              to={`/detail/${hotel.id}`}
              className="text-2xl font-bold cursor-pointer text-blue-600 hover:text-zinc-800"
            >
              {hotel.name}
            </Link>
            <div className="flex items-center mx-2">
              <span className="flex">
                {Array.from({ length: hotel.starRating }).map((_, index) => (
                  <AiFillStar className="fill-yellow-400" key={index}/>
                ))}
              </span>
              <span className="ml-1 text-sm">{hotel.type}</span>
            </div>
          </div>

          <div>
            <div className="line-clamp-4">{hotel.description}</div>
          </div>

          <div className="grid grid-cols-2 items-end whitespace-nowrap">
            <div className="flex gap-1 items-center">
              {hotel.hotelFacilities.slice(0, 3).map((facility,index) => (
                <span className="bg-slate-100 p-2 rounded-lg font-semibold text-xs whitespace-nowrap" key={index}>
                  {facility}
                </span>
              ))}
              <span className="text-sm">
                {hotel.hotelFacilities.length > 3 &&
                  `+${hotel.hotelFacilities.length - 3} more`}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1 -mx-5">
              <span className="font-bold">
              ₹{hotel.pricePerNight} per night
              </span>
              <Link             
                to={`/detail/${hotel.id}`}
                className="bg-blue-600 text-white h-full p-2 font-semibold max-w-fit hover:bg-blue-700 rounded "
              >
                See availability
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchResultsCard;
