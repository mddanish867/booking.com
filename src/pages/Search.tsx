import React, { useState } from "react";
import { useSearchHotelsQuery } from "../Api/hotelAPI";
import Footer from "../components/Footer";
import { useSearchContext } from "../context/SearchContext";
import SearchHeader from "../components/SearchHeader";
import Header from "../components/Header";
import MainLoader from "../Helper/MainLoader";
import SearchResultCard from "./SearchResultCard";
import { hotelModel } from "../Interfaces/hotelModel";
import Pagination from "./Pagination";
import StarRatingFilter from "./StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
var dataArray = [];
const Search = () => {
  const search = useSearchContext();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const searchParams = {
    destination: search.destination,
    //checkIn: search.checkIn.toISOString(),
    //checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount,
    childCount: search.childCount,
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    sortOption,
  };
  const { data, isError } = useSearchHotelsQuery(searchParams);

  if (!data || !Array.isArray(data)) {
    return <MainLoader />;
  } else {
    dataArray = Array.isArray(data) ? data : [data];
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  // Calculate start and end index for the current page
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);

  // Slice the data array to get the records for the current page
  const currentPageData = data.slice(startIndex, endIndex);

  // star handle change
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  // hotel type handle chanhe
  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;
    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((type) => type !== hotelType)
    );
  };

  // hotel facility handle change
  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;
    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((facilityType) => facilityType !== facility)
    );
  };

  return (
    <>
      <Header />
      <SearchHeader />
      <div className="ml-24 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 pt-8">
        <div className="rounded-lg border border-slate-200 p-5 h-fit sticky top-10">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-200 pb-5">
              Filter by:
            </h3>

            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={handleStarsChange}
            />

            <HotelTypesFilter
              selectedHotelTypes={selectedHotelTypes}
              onChange={handleHotelTypeChange}
            />

            <FacilitiesFilter
              selectedFacilities={selectedFacilities}
              onChange={handleFacilityChange}
            />
            {/* 
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          /> */}
          </div>
        </div>

        <div className=" flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              {search.destination ? ` ${search.destination}: ` : ""}
              {data?.length ?? 0} properties found
            </span>
          </div>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md max-w-[30%]"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (hight to low)
            </option>
          </select>
          {currentPageData.length > 0 ? (
            currentPageData.map((hotel: hotelModel) => (
              <SearchResultCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <>
              <div className="font-bold text-2xl text-center pt-8">
                No properties found in {search.destination}
              </div>
              <br />
              <p className="text-center">
                There are no matching properties for your search criteria. Try
                updating your search.
              </p>
            </>
          )}

          <div className="mb-8">
            <Pagination
              page={pageNumber}
              pages={Math.ceil(data.length / pageSize)}
              onPageChange={(page) => setPageNumber(page)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
