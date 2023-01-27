"use client";
export default function Loading({ height = "h-screen" }: any) {
  return (
    <>
      <div className={` border w-screen bg-base-300 ${height}`}>
        <div className="flex justify-center w-full h-full px-4 py-16 bg-base-200">
          <p className="text-center my-auto text-2xl animate-bounce shadow-2xl animate-ping">
            Please wait...
          </p>
        </div>
      </div>
    </>
  );
}
