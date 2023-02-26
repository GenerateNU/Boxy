import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  <Link href="/signup" />;

  const [accountState, setAccountState] = useState("all");

  const account_tab = (state: string, text: string) => {
    return (
      <button
        onClick={() => setAccountState(state)}
        className={
            accountState == state
            ? "flex justify-center border-b-2 border-b-black"
            : "flex justify-center"
        }
      >
        {text}
      </button>
    );
  };

  return (
    <div className="flex flex-col w-full ml-12 mt-10">
      <div className="flex flex-row mb-10 ml-2">
        <h1 className="text-3xl flex ml-20">Account</h1>
        <h2 className="text-1xl text-gray-400 mt-2 ml-1">
          {" "}
          / Personal Information
        </h2>
      </div>
      <div className="flex flex-row">
        <div className="flex transition-transform h-screen h-full w-1/3">
          <div className="ml-20">
            <ul className="space-y-4">
              <li>
                <a className="flex w-full p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200">
                  <span className="flex ml-3 p-2 cursor-pointer">
                    {account_tab("account", "Account Information")}
                  </span>
                </a>
              </li>
              <li>
                <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200">
                  <span className="ml-3 p-2 cursor-pointer">
                    {account_tab("payment", "Payment Information")}
                    </span>
                </a>
              </li>
              <li>
                <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200">
                  <span className="ml-3 p-2 cursor-pointer">
                  {account_tab("password", "Change Password")}
                  </span>
                </a>
              </li>
              <li>
                <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200">
                  <span className="ml-3 p-2 cursor-pointer">
                  {account_tab("notification", "Notification Settings")}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-1xl">First Name</h1>
          <input
            type="text"
            className="mt-5 mb-5 w-[60vw] rounded-lg p-2 text-black bg-gray-100"
            placeholder="Enter your first name"
          />
         <h1 className="text-1xl">Last Name</h1>
          <input
            type="text"
            className="mt-5 mb-5 w-[60vw] rounded-lg p-2 text-black bg-gray-100"
            placeholder="Enter your last name"
          />
          <h1 className="text-1xl">Email Address</h1>
          <input
            type="text"
            className="mt-5 mb-5 w-[60vw] rounded-lg p-2 text-black bg-gray-100"
            placeholder="Enter your email"
          />
          <h1 className="text-1xl">Verified ID</h1>
        </div>
      </div>
    </div>
  );
}
