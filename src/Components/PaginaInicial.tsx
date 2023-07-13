'use client'
import { rajdhani } from "@/app/layout";
import {  Typography } from "@mui/material";


export default function PaginaInicial(){
    return(
    <div className="text-center">
        <div className="mt-10">
            <h1 className={`${rajdhani.className} font-semibold text-emerald-950 md:text-5xl text-2xl text-center`}>Página Inicial</h1>
            <Typography className="font-semibold">O projeto Mais leite é uma iniciativa que visa otimizar e gerenciar a produção de leite em fazendas leiteiras.</Typography>
        </div>
        <div className="flex items-center justify-center">
            <div className="mt-10 w-1/2 ">
            
                    <Typography >
                        Através do uso de tecnologias modernas, como o desenvolvimento de um aplicativo web, o projeto <strong>Mais leite</strong> oferece recursos abrangentes para o gerenciamento das fazendas leiteiras.
                        O projeto <strong>Mais leite</strong> possibilita o registro da quantidade de leite produzida em cada fazenda, permitindo o monitoramento da produção ao longo do tempo. Esses dados são armazenados e podem ser acessados de forma fácil e intuitiva,
                        proporcionando aos produtores uma visão detalhada do desempenho de suas fazendas.
                    </Typography>
                    <Typography>
                        Uma funcionalidade importante do projeto Mais leite é a integração com outros sistemas e serviços, como a geração de relatórios financeiros e a integração com fornecedores e distribuidores de produtos lácteos.
                        Em resumo, o projeto <strong>Mais leite</strong> é uma solução abrangente e inovadora para o gerenciamento eficiente da produção de leite em fazendas leiteiras. Ao fornecer ferramentas avançadas de monitoramento, análise e integração,
                        o projeto leiteiro capacita os produtores a alcançarem melhores resultados, aumentando a produtividade, a qualidade do leite e a rentabilidade dos negócios leiteiros.
                    </Typography>
            
            
            </div>
        </div>
    </div>
    )
}