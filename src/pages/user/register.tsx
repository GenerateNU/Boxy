import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UserRegistrationPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const session = useSession();

  async function handleSubmit() {
    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: session.data?.user?.name,
        email: session.data?.user?.email,
        phone_number: parseInt(phoneNumber),
        drivers_license_photo: "",
        username: "fadsfddfddasfddsasf", // TODO: deprecate username and password fields
        password: "dafdsfdfasfddf",
      }),
    });

    res.status === 200 ? alert("creatd user") : alert("err creating user");
  }

  return (
    <div className="container flex justify-center min-w-full pt-16">
      <h1>registration page</h1>
      <form>
        <label>
          phone number:
          <input
            type="text"
            name="phoneNumber"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
      </form>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}
