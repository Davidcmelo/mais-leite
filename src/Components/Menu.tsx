'use client'
import Image from 'next/image'

import  Header  from './Header'
import  Lista  from './Lista'
import PaginaInicial from './PaginaInicial'
import Loading from '@/app/loading'

export default function Menu(){
    
     return(
         <div className='flex '>
             <div className='w-full flex'>
                 <aside className=" border border-r-2 h-screen border-emerald-950 text-white p-1 md:p-4 hidden md:block  bg-gradient-to-b from-teal-900 to-emerald-950">
                     <Image
                         src='/imagens/vaca.png'
                         alt='logomarca mais leite'
                         width={100}
                         height={150}
                         className='mx-auto md:w-full w-1/2'
                     />
                    <Lista/>
                 </aside>
             </div>
         </div>
     )
 }
    








