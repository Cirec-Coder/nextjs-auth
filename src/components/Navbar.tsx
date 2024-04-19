import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { HandMetal, HomeIcon } from "lucide-react"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-zinc-100 py-2 border-s-zinc-200 w-full fixed top-0 z-10">
      <div className="container flex items-center justify-between">
        <Link href="/"><HomeIcon color="#99000011" /></Link>
        {session?.user ? (
          <LogoutButton />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">Sign in</Link>

        )}
      </div>
    </div>
  )
}

export default Navbar
