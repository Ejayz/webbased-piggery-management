export default function ({ error, name }: any) {
  Object.keys(error[name]).map((data: any, key: number) => {
    console.log(data);
  });

  return <></>;
}
