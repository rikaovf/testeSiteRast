const express = require('express');
const app = express();
const path = require('path');


const PORT = process.env.PORT || 3000;


// Middleware
// static define uma pasta com os arquivos html como rota estatica, quando acessar algum
// endpoint, ele tenta achar o arquivo dentro da pasta, e retornar para o navegador
// neste caso, toda rota acessada, ele tentara achar dentro da pasta "html"
app.use(express.static('html'));
app.use(express.static('files'));
app.use(express.static('styles'));
app.use(express.json());


// este comando res.sendfile, faz com que quando a rota "/" (root), do endereço do servidor
// seja acessada, ele encaminha o html ou arquivo que esta na pasta/parametro para o 
// navegador.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});


app.post('/send-email', (req, res) => {
    console.log(req.body);
    res.send('Dados recebidos');
});


app.listen(PORT, () => {
    console.log(`Servidor funconando na porta ${PORT}`);
});