import { getSession } from '@/lib/session'
import React from 'react'

const page = async () => {
  const user = await getSession();
  console.log(user)
  return (
    <div>page</div>
  )
}

export default page