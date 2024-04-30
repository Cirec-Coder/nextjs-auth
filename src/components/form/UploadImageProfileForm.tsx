'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"
import { ImageIcon, UploadIcon } from "lucide-react"
import { ACCEPTED_IMAGE_TYPES, isAcceptedImg } from "@/lib/mime"
import axios from "axios"
import { useRef, useState } from "react"


const MAX_FILE_SIZE = 300 * 1024  // 300 KB

const FormSchema = z.object({
    image: z
        .custom<File>((val) => val instanceof File, "Required")
        .refine((file) => file.size <= MAX_FILE_SIZE,
            `File size should be less than 300 KB.`
        )
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            `Only these types are allowed ${ACCEPTED_IMAGE_TYPES.join(", ").replace(/image\//g, ' .')}`
        ),


})


const UploadImageProfileForm = () => {
    const ref = useRef<HTMLButtonElement>(null)
    const { data: session, update } = useSession()
    const [image, setImage] = useState<string | null>(null)
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            image: undefined,
        },
    })

    async function updateSession(imagePath: string) {
        await update({
            ...session,
            user: {
                ...session?.user,
                image: imagePath
            }
        })
        router.refresh()

    }

    async function onSubmit(datas: z.infer<typeof FormSchema>) {
        const email = session?.user.email!;
        const formData = new FormData();
        formData.set("image", datas.image);
        formData.append("email", email);

        try {
            const res = await axios.post('/api/upload', formData)
            if (res.statusText === "OK") {
                const { image } = res.data
                updateSession(image)
                toast({
                    title: 'Image updated successfully',
                    description: `Your profile picture has been successfully updated`,
                    variant: 'success',
                })
                ref.current?.click()
            }
            return

        } catch (error: any) {
            toast({
                title: 'Image upload failed',
                description: `Something went wrong!`,
                variant: 'destructive',
            })
            return
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full" >
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange }, ...field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mb-4"
                                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                        type="file"
                                        onChange={async (event) => {
                                            // Triggered when user uploaded a new file
                                            if (event.target.files) {
                                                const file = event.target.files[0]
                                                await isAcceptedImg(file)
                                                    .then((response) => {
                                                        if (response.accepted) {
                                                            // Validate and update uploaded file
                                                            onChange(file);
                                                            setImage(URL.createObjectURL(file))
                                                        } else {
                                                            toast({
                                                                title: 'Unallowed file mimetype',
                                                                description: (
                                                                    <pre className="mt-2 rounded-mdp-4 top-0">
                                                                        <code className="w-full text-white">
                                                                            {`Something is wrong with your image file !\n${file.name}\neither the mime type is not authorized\nor the file extension does not match\nthe file header.`}
                                                                        </code>
                                                                    </pre>
                                                                ),
                                                                variant: 'destructive',
                                                            })
                                                            ref.current?.click()
                                                        }
                                                    })
                                            }
                                        }}
                                        suffix={<ImageIcon />} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }
                    />
                    <div className="flex items-center justify-center w-full max-h-20 min-h-20 border-2 border-gray-100 rounded-xl">
                        {image ?
                            <figure className="flex items-center justify-center w-14 h-14 border-2 rounded-full overflow-hidden object-cover">

                                <img className="my-5 shadow-xl border-2 border-black rounded-full w-14 h-14 object-cover" src={image} alt="image" />
                            </figure>

                            : null
                        }
                    </div>
                </div>
                <Button disabled={!image} className="w-full mt-6" type="submit"><UploadIcon className="me-2" />Upload image</Button>
                <Button ref={ref} className="w-full mt-6 hidden" type="reset" onClick={() => setImage(null)}>reset</Button>
            </form>
        </Form>

    )
}

export default UploadImageProfileForm
