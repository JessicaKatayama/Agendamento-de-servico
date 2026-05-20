document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usuarioDigitado = document.getElementById('usuario').value;
        const senhaDigitada = document.getElementById('senha').value;

        try {
            // Faz a requisição POST para a nossa nova rota /login
            const resposta = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Envia os dados encapsulados num JSON
                body: JSON.stringify({
                    usuario: usuarioDigitado,
                    senha: senhaDigitada
                })
            });

            const dados = await resposta.json();

            // Verifica se a resposta foi OK e se o servidor mandou sucesso: true
            if (resposta.ok && dados.sucesso) {
                // Login aprovado! O Javascript redireciona a página para a agenda
                window.location.href = 'agenda.html';
            } else {
                // Mostra o erro ("Usuário ou senha incorretos")
                alert(dados.erro || 'Falha ao realizar login.');
            }

        } catch (erro) {
            console.error("Erro na requisição de login:", erro);
            alert("Erro ao conectar com o servidor. Verifique se o back-end está rodando.");
        }
    });
});