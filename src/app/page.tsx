import  Fazendas  from '@/Components/Fazendas'
import  Header  from '@/Components/Header'
import Login from '@/Components/Login'
import  Menu  from '@/Components/Menu'
import PaginaInicial from '@/Components/PaginaInicial'

import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex' >
      <Menu/>
      <div className='flex flex-col w-full'>
        <Header/>
        <PaginaInicial/>
      </div>
    </main> 
  )
}


