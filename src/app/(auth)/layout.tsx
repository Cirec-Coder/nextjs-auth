import React from "react"

type TChildren = Readonly<{children:  React.ReactNode}>

const AuthLayout = ({children}: TChildren) => {
  return (
    <div className="bg-slate-200 p-10 rounded-md">{children}</div>
  )
}

export default AuthLayout