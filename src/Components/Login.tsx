'use client'

import { Button, TextField } from "@mui/material";

export default function Login() {
    return (
<div className="flex items-center justify-center h-screen plano-de-fundo">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl text-center mb-6">Bem-vindo</h1>
        <p className="text-gray-500 text-center pb-5">Faça login para acessar seu painel de controle.</p>
        <form className="space-y-4">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            color="success"
            className="rounded"
          />
          <TextField
            id="password"
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            color="success"
            className="rounded"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="rounded bg-emerald-900 hover:bg-emerald-800"
          >
            Entrar
          </Button>
          <div className="text-center hover:text-gray-600">
              <a className="pr-5" href="">Esqueceu a senha?</a>
              <a href="">Cadastrar</a>
          </div>
        </form>
      </div>
    </div>
    );
  }


