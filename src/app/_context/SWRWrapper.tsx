'use client'
import React from 'react'
import { SWRConfig } from 'swr'

const SWRWrapper = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <SWRConfig value={{
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }}>
      {children}
    </SWRConfig>
  )
}

export default SWRWrapper