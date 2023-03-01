"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputBox from "../FormComponents/inputbox";
import SelectBox from "../FormComponents/selectBox";
import Loading from "@/components/Loading/loading";
import Link from "next/link";
import getBaseUrl from "@/hooks/getBaseUrl";
import { getData, Update, ViewUser } from "@/hooks/useUserManagement";
import {
  validateNormal,
  validatePassword,
  validatePhone,
  validateSelect,
  validateSkip,
  validateUpdatePassword,
} from "@/hooks/useValidation";
import PasswordBox from "../FormComponents/passwordBox";
import InputBoxLeft from "../FormComponents/inputboxLeftLabel";

export default function EditUser({ setParsed, sortby, sorts, setPage }: any) {
 
}
