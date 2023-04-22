"use client";

import { useEffect, useState } from "react";

export default function Loading({ height = "h-screen" }: any) {
  const [words, setWords] = useState(<p></p>);
  let bounce = 0;
  useEffect(() => {
    setInterval(() => {
      if (bounce == 0) {
        setWords(
          <p className={`text-center my-auto h-12  text-2xl animate-bounce `}>
            please wait while we load this page for you &#128640;
          </p>
        );
      } else if (bounce == 2) {
        setWords(
          <p className={`text-center my-auto h-12  text-2xl animate-bounce `}>
            Today is {new Date().toDateString()} &#128197;.
          </p>
        );
      } else if (bounce == 4) {
        setWords(
          <p className={`text-center my-auto h-12  text-2xl animate-bounce `}>
            Make sure to feed the pigs &#128516;. Check feeding operation in
            feeding module.
          </p>
        );
      } else if (bounce == 6) {
        setWords(
          <p className={`text-center my-auto h-12  text-2xl animate-bounce `}>
            Are you the owner &#129332;? Check low level stocks in Reorder List
            report using your account.
          </p>
        );
      } else if (bounce == 8) {
        setWords(
          <p className={`text-center my-auto h-12  text-2xl animate-bounce `}>
            No inventory &#128561;? Restock in Stock card module. Just select
            Restock.
          </p>
        );
        bounce = 0;
      }
      bounce++;
    }, 1000);
  }, []);
  return (
    <>
      <div className={` w-screen  border-base-300  ${height}`}>
        <div className="flex justify-center w-full h-full px-4 py-16  uppercase">
          {words}
        </div>
      </div>
    </>
  );
}
