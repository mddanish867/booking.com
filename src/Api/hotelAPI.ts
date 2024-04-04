import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface HotelSearchResponse {
//   checkIn: Date; // Assuming checkIn and checkOut are ISO date strings
//   checkOut: Date;
//   // Add other properties if necessary
// }

const hotelApi = createApi({
  reducerPath: "addHotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7151/api/",
    // Authorization
    // prepareHeaders: (headers: Headers, api) => {
    //   const token = localStorage.getItem("token");
    //   token && headers.append("Authorization", "Bearer " + token);
    // },
  }), // Your API base URL
  tagTypes: ["AddHotel"],
  endpoints: (builder) => ({
    addHotel: builder.mutation({
      query: (data) => ({
        url: "AddHotel/add-hotel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AddHotel"],
    }),
    // Define other endpoints for fetching hotels,.
    getHotelById: builder.query({
      query: ({ userId, hotelId }) => {
        let url = "AddHotel/get-hotel";
        if (userId && hotelId) {
          // If both userId and hotelId are provided, append both as query parameters
          url += `?userId=${userId}&hotelId=${hotelId}`;
        } else if (userId) {
          // If only userId is provided, append it as a query parameter
          url += `?userId=${userId}`;
        } else if (hotelId) {
          // If only hotelId is provided, append it as a query parameter
          url += `?hotelId=${hotelId}`;
        }
        return { url };
      },
      providesTags: ["AddHotel"],
    }),
    // upload images
    uploadHotelImage: builder.mutation({
      query: (data) => ({
        url: "Images/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AddHotel"],
    }),
    // update hotel
    updateHotel: builder.mutation({
      query: ({ data, id }) => ({
        url: "AddHotel/update-hotel/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AddHotel"],
    }),
    // Search Hotel
    searchHotels: builder.query({
      query: ({
        destination,
        adultCount,
        childCount,
        types,
        stars,
        facilities,
      }) => {
        // Construct the base URL
        // Construct the base URL
        let url = "Search?";

        // Add non-null parameters to the URL
        if (destination) {
          url += `destination=${encodeURIComponent(destination)}&`;
        }
        if (adultCount) {
          url += `adultCount=${adultCount}&`;
        }
        if (childCount) {
          url += `childCount=${childCount}&`;
        }
        if (types && types.length > 0) {
          // Append each type as a separate query parameter
          types.forEach((type:any) => {
            url += `types=${encodeURIComponent(type)}&`;
          });
        }
        if (stars && stars.length > 0) {
          // Append each rating as a separate query parameter
          stars.forEach((ratings:any) => {
            url += `starRatings=${encodeURIComponent(ratings)}&`;
          });
        }
        // if (starRatings && starRatings.length > 0) {
        //   url += `starRatings=${starRatings.join(",")}&`;
        // }
        if (facilities && facilities.length > 0) {
          // Append each type as a separate query parameter
          facilities.forEach((facility:any) => {
            url += `selectedFacilities=${encodeURIComponent(facility)}&`;
          });
        }
        // if (selectedFacilities && selectedFacilities.length > 0) {
        //   url += `selectedFacilities=${selectedFacilities.join(",")}&`;
        // }

        // Remove the trailing '&' if present
        url = url.replace(/&$/, "");

        return {
          url,
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  useAddHotelMutation,
  useGetHotelByIdQuery,
  useUploadHotelImageMutation,
  useSearchHotelsQuery,
} = hotelApi;
export default hotelApi;
