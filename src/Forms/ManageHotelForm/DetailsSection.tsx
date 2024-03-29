import { useFormContext } from "react-hook-form";
import { hotelFacilities, hotelTypes } from "../../config/hotel-options-config";
import { useAddHotelMutation } from "../../Api/hotelAPI";
import { useNavigate } from "react-router-dom";
import apiResponse from "../../Interfaces/apiResponse";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList | null; // Adjusted type to allow null
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};
const DetailsSection = () => {
  const [addHotel, { isLoading }] = useAddHotelMutation();

  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");
  const existingImageUrls = watch("imageUrls");
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  const onSubmit = handleSubmit(async(data:HotelFormData) => { 
    try {
      const response : apiResponse = await addHotel({
        name: data.name,
  city: data.city,
  country: data.country,
  description: data.description,
  type: data.type,
  pricePerNight: data.pricePerNight,
  starRating: data.starRating,
  facilities: data.facilities,
  imageFiles:data.imageFiles, // Adjusted type to allow null
  imageUrls: data.imageUrls,
  adultCount: data.adultCount,
  childCount: data.childCount
      });      
      if (response.data) {        
        navigate("/");
      } 
    } catch (error) {
      // Handle fetch error
      console.error('Fetch error:', error);      
    }
  });

  return (
    <>
    <form className="flex flex-col gap-10 mt-5 mb-10"  onSubmit={onSubmit}>
    <div className="container flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center mt-5 mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-medium">
        Name
        <input
          type="text"
          className="rounded w-full py-1 px-2 font-normal focus:border-blue-600 focus:border-2 border border-zinc-300 h-10 outline-none"
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-red-500 font-normal">{errors.name.message}</span>
        )}
      </label>

      <div className="flex flex-col md:flex-row md:gap-4">
        <label className="text-gray-700 text-sm font-medium flex-1">
          City
          <input
            type="text"
            className="rounded w-full py-1 px-2 font-normal focus:border-blue-600 focus:border-2 border border-zinc-300 h-10 outline-none"
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.city && (
            <span className="text-red-500 font-normal">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-medium flex-1">
          Country
          <input
            type="text"
            className="rounded w-full py-1 px-2 font-normal focus:border-blue-600 focus:border-2 border border-zinc-300 h-10 outline-none"
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && (
            <span className="text-red-500 font-normal">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-medium">
        Description
        <textarea
          rows={10}
          className="rounded w-full py-1 px-2 font-normal focus:border-blue-600 focus:border-2 border border-zinc-300 outline-none"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 font-normal">{errors.description.message}</span>
        )}
      </label>
      <div className="flex flex-col md:flex-row md:gap-4">
        <label className="text-gray-700 text-sm font-medium flex-1">
          Price Per Night
          <input
            type="number"
            min={1}
            className="rounded w-full py-1 px-2 font-normal focus:border-blue-600 focus:border-2 border border-zinc-300 h-10 outline-none"
            {...register("pricePerNight", { required: "This field is required" })}
          ></input>
          {errors.pricePerNight && (
            <span className="text-red-500 font-normal">{errors.pricePerNight.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-medium flex-1">
          Star Rating
          <select
            {...register("starRating", {
              required: "This field is required",
            })}
            className="rounded w-full p-2 text-gray-700 font-normal focus:border-blue-600 focus:border-2 border border-zinc-300 h-10 outline-none"
          >
            <option value="" className="text-sm font-medium">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((num, key: number) => (
              <option value={num} key={key}>
                {num}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500 font-normal">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
    <div className="container mt-5">
    <h6 className="text-2xl font-semibold mb-3">Type</h6>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {hotelTypes.map((type, key: number) => (
        <label
          className={
            typeWatch === type
              ? "cursor-pointer bg-blue-500 text-sm text-white text-center rounded-full px-4 py-2 font-semibold"
              : "cursor-pointer bg-gray-300 text-sm text-center rounded-full px-4 py-2 font-semibold"
          }
          key={key}
        >
          <input
            type="radio"
            value={type}
            {...register("type", {
              required: "This field is required",
            })}
            className="hidden"
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
    {errors.type && (
      <span className="text-red-500 text-sm font-normal">
        {errors.type.message}
      </span>
    )}
  </div>
  <div className="container">
      <h2 className="text-2xl font-semibold mb-3">Facilities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {hotelFacilities.map((facility, key: number) => (
          <label className="text-sm flex gap-1 text-gray-700" key={key}>
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-normal">
          {errors.facilities.message}
        </span>
      )}
    </div>
    <div className="container">
      <h2 className="text-2xl font-semibold mb-3">Guests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-gray-300 p-6">
          <label className="text-gray-700 text-sm font-semibold">
            Adults
            <input
              className="border rounded w-full py-2 px-3 font-normal focus:border-blue-600 focus:border-2 outline-none"
              type="number"
              min={1}
              {...register("adultCount", {
                required: "This field is required",
              })}
            />
            {errors.adultCount?.message && (
              <span className="text-red-500 text-sm font-normal">
                {errors.adultCount?.message}
              </span>
            )}
          </label>
        </div>
        <div className="bg-gray-300 p-6">
          <label className="text-gray-700 text-sm font-semibold">
            Children
            <input
              className="border rounded w-full py-2 px-3 font-normal focus:border-blue-600 focus:border-2 outline-none"
              type="number"
              min={0}
              {...register("childCount", {
                required: "This field is required",
              })}
            />
            {errors.childCount?.message && (
              <span className="text-red-500 text-sm font-normal">
                {errors.childCount?.message}
              </span>
            )}
          </label>
        </div>
      </div>
    </div>
    <div className="container">
      <h2 className="text-2xl font-semibold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url,key:number) => (
              <div className="relative group" key={key}>
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              // const totalLength =
              //   imageFiles.length + (existingImageUrls?.length || 0);

              // if (totalLength === 0) {
              //   return "At least one image should be added";
              // }

              // if (totalLength > 6) {
              //   return "Total number of images cannot be more than 6";
              // }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-normal">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
    <span className="flex justify-end">
            <button
              type="submit"
              className="container bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-blue-700 max-w-[30%]"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </span>
          </form>
  </>
  );
};

export default DetailsSection;
