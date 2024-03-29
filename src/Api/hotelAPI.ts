import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const hotelApi = createApi({
  reducerPath: "addHotelApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://localhost:7151/api/' ,
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
    // Define other endpoints for fetching hotels, updating, deleting, etc.
    getHotelById: builder.query({
      query: (id) => ({
        url: `AddHotel/get-hotel/${id}`,
      }),
      providesTags: ["AddHotel"],
    }),
  }),
});
export const {
useAddHotelMutation,useGetHotelByIdQuery
  
 } = hotelApi;
 export default hotelApi;