import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db";
// import { sessions } from "@/lib/session";
import { getServerSession } from "next-auth"
import Image from "next/image";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        const users = await db.user.findMany()
        return (<>
            <h2 className="text-2xl">
                Admin page - welcome back {session?.user.username || session.user.name}
            </h2>
            {/* {session.user.image && */}
                <img
                    className="my-5 shadow-xl border-2 border-black rounded-full w-14 h-14 object-cover"
                    src={ session.user.image || "/default-user.png" } alt="profil image"
                    width={96}
                    height={96} />
                    {/* } */}
            {users && (
                users.map((user, index) => (
                    (user.email !== session.user.email) ?
                        <h2> {`${user.name || user.username} ==> ${user.email}`} </h2>
                        : null
                ))
            )}
        </>
        )
    }

    return (
        <h2 className="text-2xl">Please login to see this page</h2>
    )
}

export default page