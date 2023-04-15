import { signIn, useSession } from "next-auth/react";

export default function StasherDashboard() {
  const { data, status } = useSession();

  if (status === "unauthenticated") {
    signIn();
  }
  return (
    <div className="container flex justify-center min-w-full pt-16">
      <h1>my reservations </h1>
    </div>
  );
}
