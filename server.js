var express = require("express");
const nodemailer = require('nodemailer');
var app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/login.html");
})

let nome = [];
let email = [];
let senha = [];

app.post("/enviar-email", async (req, res) => {

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "3ab3ee54a82786",
          pass: "bfb3039e0af76c"
        }
    });

    var message = {
        from: req.body.remetente,
        to: req.body.destinatario,
        subject: req.body.titulo,
        text: req.body.mensagem,
        html: "<p>HTML version of the message</p>"
    };

    transport.sendMail(message, function(err) {
        if (err) return res.status(400).json({
            erro: true,
            mensagem: "Erro: E-mail não enviado com sucesso!"
        });
    });

    return res.json({
        erro: false,
        mensagem: "E-mail enviado com sucesso!"
    });
});


app.post("/logar", function(req, res) {
    for(let i=0; i<email.length; i++) {
        if(nome[i] == req.body.nome && senha[i] == req.body.senha){
            res.sendFile(__dirname + "/email.html");
            console.log("[LOGADO] " + req.body.nome + " " + req.body.senha);
        }
    }
})

app.post("/cadastrar", function(req, res) {
    for(let i=0; i<email.length; i++) {
        if(nome[i] == req.body.nome && email[i] == req.body.email && senha[i] == req.body.senha){
            res.send("Erro ao cadastrar: email já sendo utilizado!");
            return;
        }
    }
    nome.push(req.body.nome);
    email.push(req.body.email);
    senha.push(req.body.senha);
    console.log("[CADASTRO] " + req.body.nome + " | " + req.body.email + " | " + req.body.senha);
})

app.listen(3000, () => console.log('Server started...'));