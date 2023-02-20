"use client";
export default function Loading({ height = "h-screen" }: any) {
  return (
    <>
      <div className={` border w-screen base-content ${height}`}>
        <div className="flex justify-center w-full h-full px-4 py-16 base-content">
          <p className="text-center my-auto text-accent text-2xl animate-bounce shadow-2xl animate-ping">
            Please wait...
          </p>
        </div>
      </div>
    </>
  );
}
