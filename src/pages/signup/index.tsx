import Link from "next/link";

export default function SignUpPage() {
  <Link href="/signup" />;
  return (
    <div className="flex w-2/5 border border-t-white border-l-white border-r-gray border-b-white">
      <div className="flex flex-col w-full ml-12 mt-10">
        <div className="flex flex-row mb-20 ml-2">
          <h1 className="text-3xl flex ml-20">Account</h1>
          <h2 className="text-1xl text-gray-400 mt-2 ml-1">
            {" "}
            / Personal Information
          </h2>
        </div>
        <div className="flex justify-center transition-transform h-screen h-full">
          <div className="ml-20 dark:bg-gray-800">
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="flex w-full p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="ml-3 p-2">Personal Information</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="ml-3 p-2">Payment Information</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="ml-3 p-2">Change Password</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="ml-3 p-2">Notification Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
