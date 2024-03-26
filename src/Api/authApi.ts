import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7151/api/",
    // Authorization
    // prepareHeaders: (headers: Headers, api) => {
    //   const token = localStorage.getItem("token");
    //   token && headers.append("Authorization", "Bearer " + token);
    // },
  }),
  tagTypes: ["UserAuthentication"],
  endpoints: (builder) => ({
    // user registration
    register: builder.mutation({
      query: (userData) => ({
        url: "User/register-user",
        method: "POST",
        headers:{
            "Content-type":"application/json",
        },
        body: userData,
      }),
      invalidatesTags: ["UserAuthentication"],
    }),  
    // check if user exists
    getUserByEmail: builder.mutation({
      query: (userData) => ({
        url: "User/check-email",
        method: "POST",
        headers:{
            "Content-type":"application/json",
        },
        body: userData,
      }),
      invalidatesTags: ["UserAuthentication"],
    }),  
      // Post Api calls login
      loginUser: builder.mutation({
        query: (userCredentials)=>({
            url:`User/login`,
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body:userCredentials
        }),
    }),
      // Post Api calls forgot password
      forgotPassword: builder.mutation({
        query: (email)=>({
            url:`User/forgot-password`,
            method:"POST",
            headers:{
              "Content-type":"application/json",
          },
          body:email
        }),
    }),
     // Post Api calls forgot password
     restPassword: builder.mutation({
      query: (ueserDetail)=>({
          url:`User/reset-password`,
          method:"POST",
          headers:{
            "Content-type":"application/json",
        },
        body:ueserDetail
      }),
  }),
  }),
});

export const {

 useRegisterMutation,
 useGetUserByEmailMutation,
 useLoginUserMutation,
 useForgotPasswordMutation,
 useRestPasswordMutation
} = authApi;
export default authApi;