import React from 'react'
import { requireAuth } from '../utils'
export async function loader({ request }){
  await requireAuth(request)
  return null
}
function Edu() {
  return (
    <div className='text-white'>
      Edu Here
    </div>
  )
}

export default Edu
