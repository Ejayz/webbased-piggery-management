"use client";
import ViewForm from "@/components/UserManagementForm/ViewForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EditUser from "@/components/UserManagementForm/editForm";
import AddUser from "@/components/UserManagementForm/addForm";
import UserDetails from "@/components/TableBody/userDetails";
interface User {
  user_id: number;
  username: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  job: string;
  is_exist: string;
}

interface ApiData {
  code: number;
  data: User[];
}

export default function Page() {
  const [userid, setUserid] = useState();
  const [compos, setComps] = useState(<AddUser></AddUser>);
  const action = useSearchParams().get("action");
  const [userData, setUserData] = useState<ApiData>();
  const [parsed, setParsed] = useState<User[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isSorting, setisSorting] = useState(false);
  const [sorts, setSort] = useState("ASC");
  const [sortby, setSortBy] = useState("username");

  const sortData = async () => {
    setisSorting(true);
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      sortby: sortby,
      sortorder: sorts,
    });

    let response = await fetch(
      "http://localhost:3000/api/post/getSortedUsers",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    if (response.ok) {
      setTimeout(() => {
        if (data.code == 200) {
          setUserData(data);
          setParsed(data.data);
          setisSorting(false);
        }
        if (data.code == 404) {
          setMessage(data.message);
        }
      }, 5000);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let response = await fetch(`${location.origin}/api/get/getUsers`, {
        method: "GET",
        headers: headersList,
      });
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          if (data.code == 200) {
            setUserData(data);
            setParsed(data.data);
          }
          if (data.code == 404) {
            setMessage(data.message);
          }
        }, 5000);
        console.log(userData);
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    async function getView() {
      console.log(action == null);
      if (action == null || action == "a") {
        setComps(<AddUser></AddUser>);
      } else if (action == "v") {
        setComps(<ViewForm></ViewForm>);
      } else if (action == "e") {
        setComps(<EditUser></EditUser>);
      } else if (action == "d") {
        setComps(<ViewForm></ViewForm>);
      }
    }
    getView();
  }, [action]);

  return (
    <>
      <div className="w-full h-auto oveflow-y-auto flex flex-col overflow-x-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <Image
            src={"/assets/icons/manage_user.png"}
            alt={""}
            className="h-16 w-16"
            height={512}
            width={512}
          ></Image>
          <p className="text-2xl  my-auto p-4">User Management</p>
        </div>

        <div className="h-auto w-11/12  mx-auto shadow-xl flex flex-col">
          <div className={` w-full  h-auto mx-auto flex`}>{compos}</div>
        </div>
        <div className="h-screen w-full flex flex-col text-center overflow-x-hidden">
          <p className="text-2xl p-4 mx-auto">Users Data</p>
          <div className="w-11/12 mx-auto h-auto flex flex-row">
            <div className="dropdown my-auto ">
              <label tabIndex={0} className="btn m-1">
                Sort
              </label>
              <div
                tabIndex={0}
                className={`${
                  isSorting ? "hidden" : "block"
                } dropdown-content card card-compact w-64 p-2 shadow bg-base-200`}
              >
                <div className="card-body">
                  <div className="divider">Sort Order</div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Ascending</span>
                      <input
                        type="radio"
                        name="sorts"
                        value={"ASC"}
                        defaultChecked={true}
                        className="radio checked:bg-blue-500"
                        onChange={(e) => {
                          setSort(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Descending</span>
                      <input
                        type="radio"
                        name="sorts"
                        className="radio checked:bg-blue-500"
                        value={"DESC"}
                        onChange={(e) => {
                          setSort(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  <div className="divider">Sort By</div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Username</span>

                      <input
                        type="radio"
                        name="keys"
                        value="username"
                        className="radio checked:bg-red-500"
                        defaultChecked={true}
                        checked={sortby == "username"}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  {/*  */}
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">First Name</span>
                      <input
                        type="radio"
                        name="keys"
                        className="radio checked:bg-red-500"
                        value="first_name"
                        checked={sortby == "first_name"}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  {/*  */}
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Middle Name</span>
                      <input
                        type="radio"
                        name="keys"
                        className="radio checked:bg-red-500"
                        value="middle_name"
                        checked={sortby == "middle_name"}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  {/*  */}
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Last Name</span>
                      <input
                        type="radio"
                        name="keys"
                        className="radio checked:bg-red-500"
                        value="last_name"
                        checked={sortby == "last_name"}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  {/*  */}
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Job</span>
                      <input
                        type="radio"
                        name="keys"
                        className="radio checked:bg-red-500"
                        value="job"
                        checked={sortby == "job"}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Phone</span>
                      <input
                        type="radio"
                        name="keys"
                        className="radio checked:bg-red-500"
                        checked={sortby == "phone"}
                        value="phone"
                        onChange={(e) => {
                          setSortBy(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  <button onClick={sortData} className="btn btn-primary m-1">
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <div className="form-control mr-0 ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered"
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <UserDetails
            parsed={parsed}
            message={message}
            isSorting={isSorting}
          ></UserDetails>
        </div>
      </div>
    </>
  );
}
