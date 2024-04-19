import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { boolean } from "zod"

export interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, type, autoComplete, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState<boolean>(false)
        return (
            <Input
                className={className}
                ref={ref}
                autoComplete={autoComplete}
                type={showPassword ? 'text' : 'password'}
                {...props}
                suffix={showPassword
                    ? <EyeIcon
                        className="select-none"
                        onClick={() => setShowPassword(false)} />
                        : <EyeOffIcon
                        className="select-none"
                        onClick={() => setShowPassword(true)} />
                }
            />
        )
    }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
