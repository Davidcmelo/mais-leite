'use client'
import Image from 'next/image'
import  Lista  from './Lista'

export default function Menu(){
    
     return(
         <div className='flex min-h-screen '>
             <div className='w-full flex  '>
                 <aside className=" border  border-r-2 border-emerald-950 text-white p-1 md:p-4 hidden md:block  bg-gradient-to-b from-teal-900 to-emerald-950">
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
    








