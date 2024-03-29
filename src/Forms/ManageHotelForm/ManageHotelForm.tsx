import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

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

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const navigate = useNavigate();
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    // Handle image files
    if (formDataJson.imageFiles) {
      Array.from(formDataJson.imageFiles).forEach((file) => {
        formData.append("imageFiles", file);
      });
    }

    onSave(formData);
  });

  return (
    <>
      <Header />
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col gap-10 mt-5 mb-10"
          onSubmit={onSubmit}
        >
          
          
        </form>
      </FormProvider>
      <Footer />
    </>
  );
};

export default ManageHotelForm;
