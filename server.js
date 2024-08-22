const { validate } = require('deep-email-validator'); // importação do validador de email
const express = require('express');
const app = express();
const path = require('path');


const PORT = process.env.PORT || 3000;


// Middleware
// static define uma pasta com os arquivos html como rota estatica, quando acessar algum
// endpoint, ele tenta achar o arquivo dentro da pasta, e retornar para o navegador
// neste caso, toda rota acessada, ele tentara achar dentro da pasta "html"
app.use(express.static('public'));
app.use(express.json());


// este comando res.sendfile, faz com que quando a rota "/" (root), do endereço do servidor
// seja acessada, ele encaminha o html ou arquivo que esta na pasta/parametro para o 
// navegador.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html/index.html'));
});


app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
 
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ status: 'error', message: 'Campos obrigatórios faltando!' })
    }
 
 
    // Valida o email
    var validationResult = ""
    validate(email).then((res)=>{
        validationResult = res;
    })
 
 
    if (!validationResult.valid) {
        return res.status(400).json({
            status: 'error',
            message: 'Email não é válido. Por favor, tente novamente!',
            reason: validationResult.reason
        });
    }
 
 
    // Lógica de envio de email
 
 
    // Resposta de placeholder para uma submissão de email bem-sucedida
    res.status(200).json({
        status: 'success',
        message: 'Email enviado com sucesso'
    });
 });


app.listen(PORT, () => {
    console.log(`Servidor funconando na porta ${PORT}`);
});