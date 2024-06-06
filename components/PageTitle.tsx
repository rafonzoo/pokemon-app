import { FC, ReactNode } from 'react'

const PageTitle: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <h1 className='pb-5 text-center text-3xl font-bold leading-[2.375rem]'>
      {children}
    </h1>
  )
}

export default PageTitle
