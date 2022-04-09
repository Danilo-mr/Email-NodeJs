var express = require("express");
var app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/login.html");
})

let usuarios = [];

app.post("/logar", function(req, res) {
    let nome = req.body.nome;
    let senha = req.body.senha;
    for(let i=0; i<usuarios.length; i++) {
        if(usuarios[i][0] === nome && usuarios[i][1] === senha){
            res.sendFile(__dirname + "/bem-vindo.html");
            console.log("[LOGADO] " + nome + " " + senha);
        }
    }
    
})

app.post("/cadastrar", function(req, res) {
    let nome = req.body.nome;
    let senha = req.body.senha;
    usuarios.push([nome, senha]);
    console.log("[CADASTRO] " + nome + " " + senha);
})

app.get("/listagem", function(req, res){
    res.send(usuarios);
})

app.listen(3000);