"use client";
import Link from "next/link";

export default function Components({
  parsed,
  message,
  isSorting,
  isSearch,
  keyword,
}: any) {
  if (isSearch) {
    return (
      <>
        <div className="w-full h-10s">
          <div className="flex flex-row mx-auto text-center">
            <span className="text-center mx-auto">
              Finding something related to <b>{keyword}</b>
            </span>
          </div>
        </div>
      </>
    );
  } else if (message != "" && parsed.lenght !== 0) {
    return (
      <>
        <div className="w-full h-10s">
          <div className="flex flex-row mx-auto text-center">
            <span className="text-center mx-auto">
              {message} <b>{keyword}</b>
            </span>
          </div>
        </div>
      </>
    );
  } else if (parsed.length == 0) {
    return (
      <>
        <div className="w-full h-10">
          <div className="flex flex-row mx-auto text-center">
            <span className="ml-auto mr-0">
              Please wait while we get user data
            </span>
            <div className="h-6 ml-2 mr-auto animate-spin w-6 rounded-full border-b-4 border-l-4 border-slate-400"></div>
          </div>
        </div>
      </>
    );
  } else if (isSorting) {
    return (
      <>
        <div className="w-full h-10">
          <div className="flex flex-row mx-auto text-center">
            <span className="ml-auto mr-0">
              Please wait while we retrieve and sort user data
            </span>
            <div className="h-6 ml-2 mr-auto animate-spin w-6 rounded-full border-b-4 border-l-4 border-slate-400"></div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <table className="w-11/12 mx-auto h-12 text-left text-fixed lg:text-center mb-24  rounded-md">
        <thead className="lg:table-header-group  hidden  text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Job</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll overflow-x-hidden overscroll-contain h-12">
          {parsed.map((user: any, index: number) => (
            <tr
              className={`h-auto lg:table-row block bg-slate-300 rounded-md my-2 py-4 ${
                index % 2 == 0 ? "bg-slate-200" : "bg-slate-400"
              }`}
              key={index}
            >
              <td className="block lg:table-cell flex lg:flex-none flex-row">
                <p className="lg:hidden ml-4 w-1/4 font-bold">Username:</p>
                <p className="break-words">{user.username}</p>
              </td>
              <td className="block lg:table-cell flex lg:flex-none flex-row">
                <p className="lg:hidden ml-4 w-1/4 font-bold">Full Name:</p>
                <p className="break-words">
                  {user.first_name} {user.middle_name} {user.last_name}
                </p>
              </td>
              <td className="block lg:table-cell flex lg:flex-none flex-row">
                <p className="lg:hidden ml-4 w-1/4 font-bold">Job:</p>
                <p className="break-all">{user.job}</p>
              </td>
              <td className="block lg:table-cell flex lg:flex-none flex-row">
                <p className="lg:hidden ml-4 w-1/4 font-bold">Phone:</p>
                <p className="break-all">{user.phone}</p>
              </td>
              <td className="block lg:table-cell flex lg:flex-none flex-row">
                <p className="lg:hidden ml-4 w-1/4 font-bold">Actions</p>
                <div className="btn-group">
                  <Link
                    className="px-2 hover:text-blue-500 link"
                    href={{
                      pathname: `/user_management/owner/`,
                      query: {
                        action: "e",
                        id: user.user_id,
                      },
                    }}
                  >
                    Edit
                  </Link>
                  |
                  <Link
                    className="px-2 hover:text-blue-500 link"
                    href={{
                      pathname: `/user_management/owner/`,
                      query: {
                        action: "v",
                        id: user.user_id,
                      },
                    }}
                  >
                    View
                  </Link>
                  |
                  <Link
                    className="px-2 hover:text-blue-500 link"
                    href={{
                      pathname: `/user_management/owner/`,
                      query: {
                        action: "d",
                        id: user.user_id,
                      },
                    }}
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
