"use client";

export default function Page() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="w-full md:w-1/2 md:mr-8">
          <form className="border rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="otp"
              >
                OTP
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="otp"
                type="text"
                placeholder="Enter OTP"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Confirm OTP
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 md:ml-8">
          <div className="px-8 pt-6 pb-8 mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Instructions
            </h3>
            <p className="text-gray-700 text-sm">
              The OTP provided will only be valid for this session. Please do
              not refresh the page or the OTP will no longer be valid.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
