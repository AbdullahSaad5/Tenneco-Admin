'use client'

import React from 'react'
import '../css/admin.scss'

export const CustomStylesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export default CustomStylesProvider
