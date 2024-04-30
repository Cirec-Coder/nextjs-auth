'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Session } from 'next-auth';
import UploadImageProfileForm from './form/UploadImageProfileForm';

type TChildren = Readonly<{
  children: React.ReactNode,
  session: Session,
  hidden?: boolean
}>

const EditProfileButton = ({ children, session, hidden = true }: TChildren) => {
  const [showProfile, setShowProfile] = useState<boolean>(!hidden)

  return <>
    {(showProfile ? (
      <div className='border-2 border-gray-100 rounded-xl p-4'>
        <Button
          onClick={() => setShowProfile(false)}>
          Hide {session.user.name || session.user.username}'s Profile
        </Button>
        <UploadImageProfileForm />
      </div>
    )
      : (

        <Button
          onClick={() => setShowProfile(true)} className='w-full'>
          {children}
        </Button>
      )
    )}


  </>
}

export default EditProfileButton
