import { rajdhani } from "@/app/layout";

export default function PaginaInicial(){
    return(
        <div>
           <h1 className={`${rajdhani.className} font-semibold text-emerald-950 md:text-5xl text-2xl text-center`}>Página Inicial</h1>
            <p>Bem-vindo</p>
        </div>
    )
}