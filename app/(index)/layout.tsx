"use client";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const error = useSearchParams().get("error");
  async function getError() {
    if (error == "401") {
      toast.error("Login first to access dashboard.");
    }
  }

  getError();

  return (
    <html className="overflow-x-scroll lg:overflow-hidden">
      <body>
        {children}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
