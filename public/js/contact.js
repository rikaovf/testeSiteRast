const contactForm = document.querySelector('.contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Impede a submissão padrão do formulário


    const formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    };


    try {
        var response = ''
        var result = ''

        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((res)=>{
            response = res;
            res.json()
        }).then((res)=>{
            result = res;
        })

        if (!response.ok) {
            // Se a resposta não estiver OK, lida com isso mostrando um alerta
            alert(`Falha ao enviar mensagem: ${result.message}`);
            return;  // Sai da função cedo se houver um erro
        }


        // Verifica o status específico da aplicação no JSON quando a resposta está OK
        if (result.status === 'success') {
            alert('Email enviado');


            // Faz reset dos campos do formulário após submissão bem-sucedida
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        } else {
            // Lida com falha no nível da aplicação não capturada por response.ok
            alert('Falha na operação: ' + result.message);
        }


    } catch (error) {
        // Lida com qualquer exceção que ocorra durante o fetch
        console.error('Erro:', error);
        alert('Erro de rede ou não é possível conectar ao servidor');
    }


});