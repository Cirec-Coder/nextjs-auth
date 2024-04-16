'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
// import { toast } from "../ui/use-toast"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import GoogleSignInButton from "@/components/GoogleSignInButton"

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must have 8 caracters at least')
})

const SignInForm = () => {
  // const {toast} = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })



  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 top-0">
    //       <code className="text-black">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full" >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" type="email" autoComplete="email" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter our password" type="password" autoComplete="current-password" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        <Button className="w-full mt-6" type="submit">Sign in</Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </p>

    </Form>

  )
}

export default SignInForm
