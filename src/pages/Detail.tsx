import { useParams } from "react-router-dom";
// import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

import { AiFillStar } from "react-icons/ai";
import { useGetHotelByIdQuery } from "../Api/hotelAPI";
import MainLoader from "../Helper/MainLoader";
import Header from "../components/Header";
import GuestInfoForm from "../Forms/GuestInForm/GuestInForm";
import Footer from "../components/Footer";
var dataArray = [];

const Detail = () => {
  const { hotelId } = useParams();

  const searchParams = {
    hotelId: hotelId,
  };

  const { data, isError } = useGetHotelByIdQuery(searchParams);

  if (!data || !Array.isArray(data)) {
    return <MainLoader />;
  } else {
    dataArray = Array.isArray(data) ? data : [data];
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  return (
    <>
      <Header />

 {/* BreadCrum */}
      <nav
        className="container flex my-8 font-extralight "
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-normal text-blue-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              Home -
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-normal text-blue-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                {dataArray[0].country} -{" "}
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-normal text-blue-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                {dataArray[0].city} -{" "}
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                {dataArray[0].name}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="container space-y-6 my-8">

        {/* Rating for particular hoel */}
        <div>
          <span className="flex">
            {Array.from({ length: dataArray[0].starRating }).map((_, index) => (
              <AiFillStar className="fill-yellow-400" key={index}/>
            ))}
          </span>
          <h1 className="text-3xl font-semibold">{dataArray[0].name}</h1>
        </div>

        {/* Image of the particular hotel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {dataArray[0].images &&
            dataArray[0].images.map((image: string) => (
              <div className="h-[300px]" key={image}>
                <img
                  src={image}
                  // alt={dataArray[0].name}
                  className="rounded-md w-full h-full object-cover object-center"
                />
              </div>
            ))}
        </div>

        {/* Facilities of the particular hotel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {dataArray[0].hotelFacilities &&
            dataArray[0].hotelFacilities.map((facility: string) => (
              <div
                className="border border-slate-300 rounded-sm p-3"
                key={facility}
              >
                {facility}
              </div>
            ))}
        </div>

        {/* description of the particular hotel */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          {/* break the line after two dots */}
          <div className="whitespace-pre-line mr-8">
            {dataArray[0].description.replace(/\./g, ".\n")}
          </div>

          {/* Guest form to book particular hotel */}
          <div className="h-fit">
            <GuestInfoForm
              pricePerNight={dataArray[0].pricePerNight}
              hotelId={dataArray[0].id}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detail;
