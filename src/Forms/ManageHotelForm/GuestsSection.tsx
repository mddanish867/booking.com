import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
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
  );
};

export default GuestsSection;
