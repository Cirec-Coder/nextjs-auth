import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="container">
      <h1 className="text-4xl">Home</h1>
      <Link href='/admin' className={buttonVariants()} >Open My Admin</Link>

      <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      {JSON.stringify(session)}
    </div>
  )
}

// var log = console.log;

// console.log = function(){

// const LOG_PREFIX = new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear() + ' / ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
//     // 1. Convert args to a normal array
//     var args = Array.from(arguments);
//     // OR you can use: Array.prototype.slice.call( arguments );
        
//     // 2. Prepend log prefix log string
//     // args.unshift('%c ' + LOG_PREFIX + ": ");
//     args.push("color: #0a0");
        
//     // console.warn(args)
//     // 3. Pass along arguments to console.log
//     log.apply(console, args);
// }
// // console.log('I did it!')

