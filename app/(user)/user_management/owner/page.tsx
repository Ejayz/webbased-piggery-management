"use client";
import ViewForm from "@/components/UserManagementForm/ViewForm";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import EditUser from "@/components/UserManagementForm/editForm";
import AddUser from "@/components/UserManagementForm/addForm";
import UserDetails from "@/components/TableBody/userDetails";
import ApiUrlGenerator from "@/hooks/getApiUrls";
import getBaseUrl from "@/hooks/getBaseUrl";
import ConfirmControl from "@/components/FormComponents/confirm";
import RemoveForm from "@/components/UserManagementForm/RemoveForm";
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
  const base_url = getBaseUrl();
  const [keyword, setKeyword] = useState("");
  const [isSearch, setSearch] = useState(false);
  const [rowSort, setRowSort] = useState("username");
  const [colsData, setColsData] = useState([
    "username",
    "name",
    "job",
    "phone",
  ]);
  const [isTyping, setisTyping] = useState(false);
  const sortData = async () => {
    if (base_url == null) {
      return;
    }

    setisSorting(true);
    setisTyping(false);
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      sortby: sortby,
      sortorder: sorts,
    });

    let response = await fetch(`${base_url}/api/post/getSortedUsers`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();

    if (data.code == 200) {
      setUserData(data);
      setParsed(data.data);
      setisSorting(false);
    }
    if (data.code == 404) {
      setMessage(data.message);
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
        if (data.code == 200) {
          if ((!isSearch || !isSorting) && parsed.length == 0) {
            setUserData(data);
            setParsed(data.data);
          }
        }
        if (data.code == 404) {
          setMessage(data.message);
        }
      }
    };
    getUserInfo();
  }, []);

  /**Search for user with related keyword */
  const SearchUser = async (e: any) => {
    e.preventDefault();
    setisTyping(false);
    setSearch(true);
    setMessage("");
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      keyword: keyword,
      sortby: sortby,
      sortorder: sorts,
    });
    let response = await fetch(
      `${base_url}/api/post/UserManagement/SearchUser/`,
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    if (data.code === 200) {
      setSearch(false);

      setUserData(data);
      setParsed(data.data);
    }
    if (data.code === 404) {
      setSearch(false);
      setMessage(data.message);
    }
  };

  useEffect(() => {
    if (keyword == "") {
      sortData();
    }
    if (parsed.length != 0 && keyword !== "") {
      setisTyping(true);
    }
  }, [keyword]);

  useEffect(() => {
    async function getView() {
      if (action == null || action == "a") {
        setComps(<AddUser sortData={sortData}></AddUser>);
      } else if (action == "v") {
        setComps(<ViewForm></ViewForm>);
      } else if (action == "e") {
        setComps(<EditUser sortData={sortData}></EditUser>);
      } else if (action == "d") {
        setComps(<RemoveForm></RemoveForm>);
      }
    }
    getView();
  }, [action]);

  return (
    <>
      <div className="w-full h-auto oveflow-y-scroll flex flex-col overflow-x-hidden">
        <div className="lg:h-1/2 h-auto">
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
        </div>
        <div className="lg:h-1/2 h-auto w-full flex flex-col text-center overflow-hidden">
          <p className="text-2xl p-4 mx-auto">Users Data</p>
          <div className="w-11/12 mx-auto h-auto flex flex-row">
            <div className="dropdown lg:hidden my-auto ">
              <label tabIndex={0} className="btn m-1">
                Sort
              </label>
              <div
                tabIndex={0}
                className={`${
                  isSorting ? "hidden" : "block"
                } dropdown-content card card-compact w-64 p-2 shadow bg-base-200`}
              >
                <div className="card-body  overflow-y-auto">
                  <div className="divider">Sort Order</div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Ascending</span>
                      <input
                        type="radio"
                        name="sorts"
                        value={"ASC"}
                        className="radio checked:bg-blue-500"
                        checked={sorts == "ASC"}
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
                        checked={sorts == "DESC"}
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
            <form onSubmit={SearchUser} className="form-control mr-0 ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search…"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
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
            </form>
          </div>
          <UserDetails
            parsed={parsed}
            message={message}
            isSorting={isSorting}
            isSearch={isSearch}
            keyword={keyword}
            sortorder={sorts}
            sortby={sortby}
            setSortby={setSortBy}
            setSort={setSort}
            sortData={sortData}
            colsData={colsData}
            isTyping={isTyping}
          ></UserDetails>
        </div>
      </div>
    </>
  );
}
