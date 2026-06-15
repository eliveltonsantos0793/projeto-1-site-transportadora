import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../")));

const PORT = process.env.PORT || 3000;

// Redirect old/missing rastreamento page to contact
app.get(['/pages/rastreamento.html', '/rastreamento', '/consultar-rastreamento'], (req, res) => {
    return res.redirect(302, '/pages/contato.html');
});

app.post("/enviar", async (req,res)=>{


const dados = req.body;

const requiredFields = [
    "nome",
    "empresa",
    "telefone",
    "email",
    "origem",
    "destino",
    "carga",
    "mensagem"
];

const missingFields = requiredFields.filter(field => !dados?.[field] || String(dados[field]).trim() === "");

if(missingFields.length){
    return res.status(400).json({
        erro: `Campos obrigatórios faltando: ${missingFields.join(", ")}`
    });
}

try{


const transporter =
    nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_EMPRESA,
            pass: process.env.EMAIL_SENHA
        }
    });



await transporter.sendMail({

from:process.env.EMAIL_EMPRESA,

to:process.env.EMAIL_EMPRESA,

subject:"Nova solicitação - HB TRANSPORTS",

html:`

<h2>Nova solicitação de transporte</h2>

<p><strong>Nome:</strong> ${dados.nome}</p>

<p><strong>Empresa:</strong> ${dados.empresa}</p>

<p><strong>Telefone:</strong> ${dados.telefone}</p>

<p><strong>E-mail:</strong> ${dados.email}</p>

<p><strong>Origem:</strong> ${dados.origem}</p>

<p><strong>Destino:</strong> ${dados.destino}</p>

<p><strong>Carga:</strong> ${dados.carga}</p>

<p><strong>Mensagem:</strong> ${dados.mensagem}</p>

`

});


res.json({

sucesso:true

});


}

catch(error){


console.log(error);


res.status(500).json({

erro:"Falha no envio"

});


}


});




app.listen(
PORT,
()=>{

console.log(
`Servidor rodando na porta ${PORT}`
);

});