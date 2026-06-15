# HB TRANSPORTS

## Website Institucional Corporativo de Logística


![HB TRANSPORTS](assets/images/logo/logo-hb.svg)



# Sobre o Projeto

O HB TRANSPORTS é um website institucional desenvolvido para representar uma empresa moderna de transporte rodoviário, logística empresarial e distribuição nacional.

O projeto foi criado com foco em:

- Credibilidade empresarial;
- Experiência do usuário;
- Conversão comercial;
- Identidade visual corporativa;
- Performance;
- SEO técnico;
- Escalabilidade futura.


A proposta é apresentar a HB TRANSPORTS como uma parceira estratégica para empresas, indo além de uma simples transportadora.



---

# Objetivo

O website tem como finalidade:

- Apresentar serviços logísticos;
- Gerar oportunidades comerciais;
- Demonstrar estrutura operacional;
- Apresentar frota;
- Facilitar contato com clientes.



---

# Tecnologias Utilizadas


## Front-End

- HTML5
- CSS3
- JavaScript Vanilla


## Recursos utilizados

- HTML semântico;
- CSS responsivo;
- Mobile First;
- Manipulação DOM;
- Animações CSS;
- Layout corporativo personalizado.



---

# Estrutura do Projeto

---

## Backend (API de envio de formulário)

O backend simples usado para enviar e-mails está em `backend/`. Para rodar localmente:

1. Entre na pasta do backend:

```bash
cd backend
```

2. Instale dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na pasta `backend/` com as variáveis:

```
EMAIL_EMPRESA=seu-email@gmail.com
EMAIL_SENHA=sua-senha-ou-senha-de-aplicativo
PORT=3000
```

Observação: para Gmail, use uma senha de app (App Password) quando a autenticação em duas etapas estiver ativa. O servidor roda na porta definida em `PORT` (padrão `3000`).

4. Inicie o servidor:

```bash
npm start
```

O endpoint para envio do formulário é `POST /enviar`.

### Serviço integrado

O backend agora serve os arquivos estáticos do site a partir da pasta raiz do projeto. Basta iniciar o `backend` e acessar via navegador:

```bash
cd backend
npm start
```

Depois abra `http://localhost:3000/index.html` ou `http://localhost:3000/pages/contato.html`.
