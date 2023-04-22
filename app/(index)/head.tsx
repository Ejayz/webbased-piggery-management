"use client";
export default function Head({title}:any) {
  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      {/* <link rel="manifest" href="manifest.json" /> */}
      <meta charSet="UTF-8"></meta>
    </>
  );
}
