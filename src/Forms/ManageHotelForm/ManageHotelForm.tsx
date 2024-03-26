import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import Header from "../../components/Header";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import Footer from "../../components/Footer";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

// type Props = {
//   hotel?: HotelType;
//   onSave: (hotelFormData: FormData) => void;
//   isLoading: boolean;
// };

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    console.log(formDataJson)
  });
  return (
    <>
      <Header />

      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10 mt-5 mb-10" onSubmit={onSubmit}>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection/>
          <ImagesSection/>
          <span className="flex justify-end">
          <button
            // disabled={isLoading}
            type="submit"
            className="container bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500 max-w-[30%]"
          >
            Save
            {/* {isLoading ? "Saving..." : "Save"} */}
          </button>
        </span>
        </form>
      </FormProvider>
      <Footer/>
    </>
  );
};

export default ManageHotelForm;
