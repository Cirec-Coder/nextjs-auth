import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

async function getSession() {
   
}

export const   sessions =  getServerSession(authOptions);
