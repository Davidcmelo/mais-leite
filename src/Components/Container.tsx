import { ReactNode } from "react"
import Header from "./Header"
import Menu from "./Menu"

interface Props {
    children: ReactNode
  }
  
  export default function Container({ children }: Props) {
    return (
      <div className='flex h-full'>
          <Menu/>
          <div className="w-full">
              <Header/>
              { children }
          </div>
      </div>
    )
  }