import EditProfileButton from '@/components/EditProfileButton';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div className='flex flex-col items-center gap-2 text-xl'>
        Profile
        <EditProfileButton session={session} hidden={false}>Edit your profile</EditProfileButton>
      </div>
    )
  }
  return <div className='text-xl'>You have to be logged in to see this page</div>
}
export default page