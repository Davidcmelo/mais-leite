import Link from 'next/link';


export default function Lista({ children }:any){
    
    return(
        <div className='flex flex-col gap-5 pt-16 '>
             <nav>
                 <ul className='flex flex-col gap-5'>
                    <li >
                        <Link href='/pagina-inicial'><span className='font-bold hover:text-emerald-700 '>Página Inicial</span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link href='/cadastro'><span className='font-bold hover:text-emerald-700'>Cadastrar</span></Link>
                    </li> */}
                    <li>
                        <Link href='/fazendas'><span className='font-bold hover:text-emerald-700'>Fazendas</span></Link>
                    </li>
                    <li>
                        <Link href='/producao'><span className='font-bold hover:text-emerald-700'> Produção</span></Link>
                    </li>
                    <li>
                        <Link href='/resumo'><span className='font-bold hover:text-emerald-700'>Resumo</span></Link>
                    </li>
                    <li>
                        <Link href='/usuarios'><span className='font-bold hover:text-emerald-700'>Usuário</span></Link>
                    </li>
                    <li>
                        <Link href='/configuracoes'><span className='font-bold hover:text-emerald-700'>Configurações</span></Link>
                    </li>

                 </ul>
             </nav>
             
        </div>
    )
}

