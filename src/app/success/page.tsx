'use client'
import dynamic from 'next/dynamic'
import React from 'react'

const SuccessPage = dynamic(() => import('@/components/Pages/Success'), { ssr: false })

function page() {
  return (
    <>
      <SuccessPage />
    </>
  )
}

export default page
