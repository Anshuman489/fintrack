import React from 'react'

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({children}: Props) => {
  return (
    <div className = "flex justify-center pt-50">
      {children}
    </div>
  )
}

export default AuthLayout
