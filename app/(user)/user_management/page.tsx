"use client";
import Image from 'next/image'
export default function Page() {
  return (
    <>
      <div className="w-full h-full grid grid-cols-3">
        <div className="h-full flex flex-row ">
          <div className="w-3/4 h-16 mx-auto flex flex-cols">
            <Image src={'/assets/icons/manage_user.png'} alt={''} className="h-16 w-16" height={512} width={512} ></Image>
            <p className="text-2xl my-auto p-4">User Management</p>
          </div>
        </div>
        <div className="h-full text-center col-span-2">
          <p className="text-2xl p-4">Users</p>
          <div className="overflow-x-auto flex">
            <table className="table mx-auto w-11/12">
              <thead>
                <tr>
                  <th></th>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
