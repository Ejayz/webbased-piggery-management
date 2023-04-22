"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { VerifyUser } from "@/hooks/useLogin";
import Image from "next/image";
import SelectBox from "@/components/FormComponents/selectBox";
import { validateSelect } from "@/hooks/useValidation";
import { useForm } from "react-hook-form";
import Error from "@/components/Errors/Error";
import { ErrorMessage } from "@hookform/error-message";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import PasswordInput from "@/components/FormCompsV2/PasswordInput";
import ScrollStack from "@/components/TechStack/ScollStack";

export default function Page() {
  //Create states for username password and remember me
  let job_option = [
    {
      value: "worker",
      display: "Worker",
      disabled: false,
    },
    {
      value: "owner",
      display: "Owner",
      disabled: false,
    },
    {
      value: "veterinarian",
      display: "Veterinarian",
      disabled: false,
    },
  ];
  const [requesting, isRequesting] = useState<boolean>(false);
  const router = useRouter();

  const exec_login = async (data: any) => {

    const returned = await VerifyUser(
      data.username,
      data.password,
      data.remember_me,
      data.job
    );
    if (returned.code == 200) {
      toast.success(returned.message);
      router.push("/dashboard");
      isRequesting(false);
    } else {
      isRequesting(false);
      toast.error(returned.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => exec_login(data);

  return (
    <>
      <div className=" h-screen w-screen min-h-screen  text-base-content flex flex-col">
        <div className="mx-auto">
          <span className="lg:text-4xl text-2xl cartone text-base-content p-4 ml-4">
            Piggery Management System
          </span>
          <br />
          <span className="frickleface text-xl ml-8">
            for your growing hog farm!
          </span>
        </div>
        <div className="flex flex-col w-1/2 mx-auto p-12">
          <div className="grid  mx-auto w-full">
            <Image
              className="w-12 h-12 mx-auto"
              src={"/assets/index/inventory.png"}
              height={500}
              width={500}
              alt={""}
            ></Image>
            <span className="text-2xl my-auto font-bold px-4 text-center">
              Manage Inventory
            </span>
          </div>
          <span className="text-center ">
            Accurately track inventory usage with auto deduction in every
            operation!Get the list of low level items instantly
          </span>
        </div>
        <div className="flex flex-col w-1/2 mx-auto p-12 uppercase">
          <div className="grid mx-auto">
            <Image
              className="w-12 h-12 mx-auto"
              src={"/assets/index/record.png"}
              height={500}
              width={500}
              alt={""}
            ></Image>
            <span className="text-2xl my-auto font-bold px-4 text-center">
              Manage Pig Record
            </span>
          </div>
          <span className="text-center ">
            Easily record,find and secure pig records. Keep track recent
            operations and feeding schedules.
          </span>
        </div>
        <div className="flex flex-col w-1/2 mx-auto p-12">
          <div className="grid  mx-auto w-full">
            <Image
              className="w-12 h-12 mx-auto"
              src={"/assets/index/schedule.png"}
              height={500}
              width={500}
              alt={""}
            ></Image>
            <span className="text-2xl my-auto font-bold px-4 text-center">
              Manage Schedules And Plans
            </span>
          </div>
          <span className="text-center ">
            Create plan and schedule for pigs to ensure that they are healthy
            and well fed.
          </span>
        </div>
        <div className="mx-auto flex flex-col">
          <span className="font-bold frickleface text-lg">
            Scan pig tags on the go! Download our mobile app.
          </span>
          <Link
            className="btn btn-outline border-solid p-8 flex flex-col mx-auto"
            target={"_blank"}
            href={
              "https://webbasedpiggeryuploaded.sgp1.cdn.digitaloceanspaces.com/public/android/MobileBasedQrCodeScannerV1.apk"
            }
          >
            <div className="mx-auto my-auto flex flex-row">
              <Image
                src="/assets/icons/android.svg"
                className="w-12  h-12 mx-auto"
                alt={""}
                width={550}
                height={550}
              ></Image>{" "}
              <span className="font-bold p-4 my-auto">Download</span>
            </div>
          </Link>
        </div>

        <div className="mx-12">
          <ScrollStack></ScrollStack>
        </div>
      </div>
    </>
  );
}
