import React from 'react'
import { Button } from './ui/button'

type TChildren = Readonly<{children:  React.ReactNode}>

const GoogleSignInButton = ({children}: TChildren) => {
    const loginWithGoogle = () => console.log('Login with Google');
    
  return (
    <Button onClick={loginWithGoogle} className='w-full'>{children}</Button>
  )
}

export default GoogleSignInButton