import { useRouter } from "next/router"

export default function Success() {
    const router = useRouter();
    return (
        <div className="flex flex-col pt-20 text-4xl items-center">
            <div>Thanks, your payment was successful!</div>
            <button onClick={() => router.push("/listings")} className="p-4 mt-8 rounded-lg bg-blue-400 hover:bg-blue-500">
                Return to Home
            </button>
        </div>
    )
}