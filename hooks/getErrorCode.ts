import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
export default async function hooks() {
  const error = useSearchParams().get("error");
  useEffect(() => {
    function getError() {
      if (error == "401") {
        toast.error("Login first before going to dashboard");
      }
    }
    getError();
  }, []);
}
