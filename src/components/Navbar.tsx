import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { HandMetal } from "lucide-react"

const Navbar = () => {
  return (
    <div className="bg-zinc-100 py-2 border-s-zinc-200 w-full fixed top-0 z-10">
        <div className="container flex items-center justify-between">
          <Link href="/"><HandMetal /></Link>
          <Link className={buttonVariants()} href="/sign-in">Sign in</Link>
        </div>
        </div>
  )
}

export default Navbar

