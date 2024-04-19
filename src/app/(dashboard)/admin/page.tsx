import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Image from "next/image";

const page = async () => {
    const session = await getServerSession(authOptions);
    // console.log("sesseion", session);

    if (session) {
        return (<>
            <h2 className="text-2xl">
                Admin page - welcome back {session?.user.username || session.user.name}
            </h2>
            {session.user.image && 
            <Image 
                className="mt-5 shadow-xl border-2 border-black rounded-full"
                src={session.user.image} alt="profil image"
                width={96}
                height={96} />}
        </>
        )
    }

    return (
        <h2 className="text-2xl">Please login to see this page</h2>
    )
}

export default page