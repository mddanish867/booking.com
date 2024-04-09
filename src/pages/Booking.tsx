import { useEffect, useState } from "react";
import BookingForm from "../Forms/BookingForm/BookingForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import MainLoader from "../Helper/MainLoader";
import { useGetHotelByIdQuery } from "../Api/hotelAPI";
import { hotelModel } from "../Interfaces/hotelModel";
var dataArray = [];
const Booking = () => {
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  const [numberOfNumber, setNumberOfNight] = useState<number>(0);
  const search = useSearchContext();
  const { hotelId } = useParams();

  useEffect(() => {
    // method to decode the token
    const jwtToken = sessionStorage.getItem("jwtToken");
    if (jwtToken) {
      const tokenParts = jwtToken.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      setCurrentUser(payload.nameid);
    } else {
      console.log("No JWT token found in sessionStorage.");
    }

    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNight(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]); // Empty dependency array ensures this effect runs only once

  const searchParams = {
    hotelId: hotelId,
  };

  const { data, isError } = useGetHotelByIdQuery(searchParams) as {
    data: hotelModel;
    isError: boolean;
  };

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
      <div className="container py-5 grid md:grid-cols-[1fr_2fr]">
        <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNumber}
          hotel={data}
        />
        {currentUser && (
          <BookingForm
            currentUser={currentUser}
            pricePerNight={data[0].pricePerNight}
            numberOfNights={numberOfNumber}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Booking;
