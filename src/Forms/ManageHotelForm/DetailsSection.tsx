import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
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
  );
};

export default DetailsSection;
