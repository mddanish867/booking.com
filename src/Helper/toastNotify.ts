import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastNotify = (message: string, type: "success" | "error" | "info" | "warning") => {
  toast(message, {
    type: type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};

export default toastNotify;
