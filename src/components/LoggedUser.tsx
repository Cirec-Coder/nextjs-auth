import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import {
    Avatar,
    AvatarImage,
  } from "@/components/ui/avatar"
   

const LoggedUser = async () => {
    const session = await getServerSession(authOptions)

    if (session) {
  return (
    <Avatar>
      <AvatarImage className="object-cover" src={ session.user.image || "../../../../default-user.png"} alt="user avatar" />
    </Avatar>
  )
}
return 
}

export default LoggedUser