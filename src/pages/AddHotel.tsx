import React, { useState } from "react";
import { hotelFacilities, hotelTypes, starRating } from "../config/hotel-options-config";
import Footer from "../components/Footer";
import Header from "../components/Header";
import inputHelper from "../Helper/inputHelper";
import { useAddHotelMutation, useUploadHotelImageMutation } from "../Api/hotelAPI";
import { useNavigate } from "react-router-dom";


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
  userId:loggedInUser,
  lastUpdated:formattedDate
};

const AddHotel = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageToStore, setImageToStore] = useState<File[]>([]);
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [loading, setLoading] = useState(false);
  const [addHotelMutation] = useAddHotelMutation();
  const [uploadImage] = useUploadHotelImageMutation();
 const navigate = useNavigate();
 

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
    const result = await uploadImage(formData); // Send the formData object to the server
    if(result){
      
    } // Handle the result if necessary
  } catch (error) {
    console.error('Error uploading images:', error);
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
  const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>, facility: string) => {
    const isChecked = e.target.checked;
    setMenuItemInputs(prevInputs => {
      if (isChecked) {
        return { ...prevInputs, facilities: [...prevInputs.facilities, facility] };
      } else {
        return { ...prevInputs, facilities: prevInputs.facilities.filter(item => item !== facility) };
      }
    });
  };

  // Submit button functionality
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
    formData.append("UserId",menuItemInputs.userId??"")
    formData.append("LastUpdated",menuItemInputs.lastUpdated)   
    
   

    let response = await addHotelMutation(formData);
    // toastNotify("Menu Item created successfully", "success");

    if (response) {
      setLoading(false);
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold text-center mt-5 mb-3">Add Hotel</h1>
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
            value={menuItemInputs.name}
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
            value={menuItemInputs.country}
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
            value={menuItemInputs.city}
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
            value={menuItemInputs.description}
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
            value={menuItemInputs.pricePerNight}
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
            value={menuItemInputs.adultCount}
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
            value={menuItemInputs.childCount}
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
            value={menuItemInputs.starRating}
            onChange={handleMenuItemInput}
            className="w-full px-4 py-2 border rounded-md focus:border-blue-600 focus:border-2 outline-none border-zinc-300"
          >
            <option value="">Select rating</option>
            {starRating.map((rating,index) => (
              <option value={rating} key={index}>{rating}</option>
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
                 menuItemInputs.type === type
                    ? " bg-blue-200"
                    : "bg-zinc-100"
                } text-sm text-center rounded-full px-4 py-2 font-semibold`}
                style={{ borderRadius: "0.375rem" }}
              >
                <input
                  required
                  name="type"
                  value={type}
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
          {previewImages.map((preview, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2 px-2"
            >
              <img
                src={preview}
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
          ))}
        </div>

        <span className="flex justify-end">
          <button
            type="submit"
            className="container bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-blue-700 max-w-[50%]"
            // disabled={!Object.keys(errors).length ? false : true}
          >
            Add Hotel
          </button>
        </span>
      </form>
      <Footer />
    </>
  );
};

export default AddHotel;
