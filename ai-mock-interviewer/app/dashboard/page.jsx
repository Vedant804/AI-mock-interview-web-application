import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import PreviousInterviews from './_components/PreviousInterviews'

function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className='font-bold text-2xl'>Dashboard</h2>
          <h2 className='text-gray-500'>Create and start your Ai Mock Interview</h2>
        </div>
        <UserButton afterSignOutUrl="/"/>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>

      <PreviousInterviews />
    </div>
  )
}

export default Dashboard