import { getServerSession } from "next-auth/next";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data, status } = useSession();

  if (data) {
    console.log(data, status);
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
      </>
    );
  }
  return <p>Access Denied</p>;
}
