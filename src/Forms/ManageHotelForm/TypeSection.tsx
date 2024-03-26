import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
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
  );
};

export default TypeSection;
