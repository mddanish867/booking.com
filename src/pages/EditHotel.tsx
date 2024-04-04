import React, { useState } from "react";
import {
  hotelFacilities,
  hotelTypes,
  starRating,
} from "../config/hotel-options-config";
import Footer from "../components/Footer";
import Header from "../components/Header";
import inputHelper from "../Helper/inputHelper";
import {
  useAddHotelMutation,
  useGetHotelByIdQuery,
  useUploadHotelImageMutation,
} from "../Api/hotelAPI";
import { useNavigate, useParams } from "react-router-dom";
import apiResponse from "../Interfaces/apiResponse";
import MainLoader from "../Helper/MainLoader";

const loggedInUser = sessionStorage.getItem("user-id");
function getDateFromDateObject(date: Date): string {
  // Get the individual components of the date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = date.getDate().toString().padStart(2, "0");
  // Return the date in the desired format (YYYY-MM-DD)
  return `${day}-${month}-${year}`;
}

// Example usage:
const currentDate = new Date();
const formattedDate = getDateFromDateObject(currentDate);
const newFormData: string[] = [];
const menuItemData = {
  name: "",
  city: "",
  country: "",
  description: "",
  pricePerNight: "",
  starRating: starRating,
  facilities: hotelFacilities,
  type: hotelTypes[0],
  adultCount: "",
  childCount: "",
  userId: loggedInUser,
  lastUpdated: formattedDate,
  imegUrls: "",
};

const EditHotel = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageToStore, setImageToStore] = useState<string[]>([]);
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [addHotelMutation] = useAddHotelMutation();
  const [uploadImage] = useUploadHotelImageMutation();
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const { data, isLoading, isError } = useGetHotelByIdQuery({
    hotelId: hotelId,
  });

  if (isLoading) {
    return <MainLoader />;
  }
  if (isError || !data) {
    return <div>Error occurred</div>;
  }

  if (data && data.length > 0 && data[0].images && data[0].images.length > 0) {
    const images = data[0].images[0]; // Accessing the first element of the images array
    if (images) {
      const cleanedUrls = images
        .slice(2, -2) // Remove the square brackets and quotes
        .split('","'); // Split the string by the comma

      // Check if the state is already set to the cleaned URLs before updating
      if (!imageToStore || imageToStore.length !== cleanedUrls.length) {
        setImageToStore(cleanedUrls);
      }
    } else {
      console.log("No images found in data.");
    }
  } else {
    console.log("No data found.");
  }

  const handlePreviewImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevImages) => [...prevImages, ...previews]);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Get the files directly from the event
    handlePreviewImage(e);
    if (!files || files.length === 0) {
      return; // No files selected, return early
    }
    const formData = new FormData();
    // Append each file to the formData object
    for (let i = 0; i < files.length; i++) {
      formData.append(`imageFiles`, files[i]); // No need to specify an index in the FormData key
    }
    try {
      const response: apiResponse = await uploadImage(formData); // Send the formData object to the server
      if (response && response.data?.images) {
        for (let i = 0; i < response.data.images.length; i++) {
          newFormData.push(response.data.images[i]);
        }
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const removeImage = (index: number) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  // get input elements
  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  // Method to handle checkbox
  const handleFacilityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    facility: string
  ) => {
    const isChecked = e.target.checked;
    setMenuItemInputs((prevInputs) => {
      if (isChecked) {
        return {
          ...prevInputs,
          facilities: [...prevInputs.facilities, facility],
        };
      } else {
        return {
          ...prevInputs,
          facilities: prevInputs.facilities.filter((item) => item !== facility),
        };
      }
    });
  };

  // Submit button functionality
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!imageToStore && !id) {
    //   toastNotify("Please upload an image", "error");
    //   setLoading(false);
    //   return;
    // }

    const formData = new FormData();

    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description);
    formData.append("City", menuItemInputs.city);
    formData.append("Country", menuItemInputs.country);
    formData.append("Type", menuItemInputs.type);
    formData.append("AdultCount", menuItemInputs.adultCount);
    formData.append("ChildCount", menuItemInputs.childCount);
    formData.append("PricePerNight", menuItemInputs.pricePerNight);
    formData.append("StarRating", menuItemInputs.starRating.toString());
    formData.append("HotelFacilities", menuItemInputs.facilities.toString());
    formData.append("UserId", menuItemInputs.userId ?? "");
    formData.append("LastUpdated", menuItemInputs.lastUpdated);
    formData.append("Images", JSON.stringify(newFormData));

    let response = await addHotelMutation(formData);
    // toastNotify("Menu Item created successfully", "success");

    if (response) {
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold text-center mt-5 mb-3">Edit Hotel</h1>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="mb-5 mx-auto max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-4 py-6 border rounded-md border-zinc-300"
      >
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Name:
          </label>
          <input
            required
            name="name"
            value={menuItemInputs.name || data[0].name}
            onChange={handleMenuItemInput}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Country:
          </label>
          <input
            required
            name="country"
            value={menuItemInputs.country || data[0].country}
            onChange={handleMenuItemInput}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            City:
          </label>
          <input
            required
            name="city"
            value={menuItemInputs.city || data[0].city}
            onChange={handleMenuItemInput}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Description:
          </label>
          <textarea
            required
            name="description"
            value={menuItemInputs.description || data[0].description}
            onChange={handleMenuItemInput}
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Price per night:
          </label>
          <input
            required
            name="pricePerNight"
            value={menuItemInputs.pricePerNight || data[0].pricePerNight}
            onChange={handleMenuItemInput}
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Adult Count:
          </label>
          <input
            required
            name="adultCount"
            value={menuItemInputs.adultCount || data[0].adultCount}
            onChange={handleMenuItemInput}
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Chlid Count:
          </label>
          <input
            required
            name="childCount"
            value={menuItemInputs.childCount || data[0].childCount}
            onChange={handleMenuItemInput}
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Rating:
          </label>
          <select
            required
            name="starRating"
            value={menuItemInputs.starRating || data[0].starRating}
            onChange={handleMenuItemInput}
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          >
            <option value="">Select rating</option>
            {starRating.map((rating, index) => (
              <option value={rating || data[0].starRating} key={index}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Facilities:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {hotelFacilities.map((facility) => (
              <div
                key={facility}
                className="text-sm flex items-center gap-1 text-gray-700"
              >
                <input
                  value={data[0].hotelFacilities[0]}
                  name={facility}
                  checked={menuItemInputs.facilities.includes(facility)}
                  onChange={(e) => handleFacilityChange(e, facility)}
                  type="checkbox"
                  className="mr-2 focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
                />
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Type:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {hotelTypes.map((type) => (
              <label
                key={type}
                className={`cursor-pointer ${
                  menuItemInputs.type === type ? " bg-blue-200" : "bg-zinc-100"
                } text-sm text-center rounded-full px-4 py-2 font-semibold`}
                style={{ borderRadius: "0.375rem" }}
              >
                <input
                  required
                  name="type"
                  value={type || data[0].type}
                  onChange={handleMenuItemInput}
                  type="radio"
                  className="hidden focus:border-blue-600 focus:bg-blue-600 focus:border-2 outline-none border-zinc-300"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-medium">
            Upload Images:
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full border rounded-md p-2 focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          />
        </div>
        <div className="flex flex-wrap mb-4">
          {(imageToStore.length === 0 ? previewImages : imageToStore).map(
            (image, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2 px-2"
              >
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-full h-auto object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md w-full mt-1"
                >
                  Remove
                </button>
              </div>
            )
          )}
        </div>
        <span className="flex justify-end">
          <button
            type="submit"
            className="container bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-blue-700 max-w-[50%]"
          >
            Update Hotel
          </button>
        </span>
      </form>
      <Footer />
    </>
  );
};

export default EditHotel;
