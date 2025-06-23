import { useCallback } from "react";
import toast from "react-hot-toast";
import DoneIcon from "../Icons/Loader/DoneIcon";

export const useToast = () => {
  const success = useCallback((message: string) => {
    toast.success(message, { duration: 3000, icon: <DoneIcon size={24} /> });
  }, []);

  return { success };
};
