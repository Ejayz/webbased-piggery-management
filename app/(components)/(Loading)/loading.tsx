export default function Loading() {
  return (
    <>
      <div className=" border w-screen h-screen bg-base-300">
        <div className="flex justify-center w-full h-full px-4 py-16 bg-base-200">
          <p className="text-center my-auto text-2xl animate-bounce shadow-2xl animate-ping">
            Please wait...
          </p>
        </div>
      </div>
    </>
  );
}
