document.addEventListener('DOMContentLoaded', () => {
    // Referências dos elementos do DOM
    const formAgendamento = document.getElementById('form-agendamento');
    const modalPix = document.getElementById('modal-pix');
    const btnFecharModal = document.getElementById('btn-fechar-modal');
    const btnCancelarModal = document.getElementById('btn-cancelar-modal');
    const btnCopiar = document.getElementById('btn-copiar');
    const inputChavePix = document.getElementById('chave-pix');
    const qrCodeImg = document.getElementById('qr-code-img');

    // Tabela de preços simulada para o projeto
    const precosServicos = {
        'corte': '50,00',
        'barba': '35,00',
        'manicure': '40,00'
    };

    // Função para abrir o modal e gerar os dados
    formAgendamento.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que a página recarregue

        // Captura os dados do formulário
        const servicoSelect = document.getElementById('servico');
        const profissionalSelect = document.getElementById('profissional');
        
        const servicoNome = servicoSelect.options[servicoSelect.selectedIndex].text;
        const profissionalNome = profissionalSelect.options[profissionalSelect.selectedIndex].text;
        const valorServico = precosServicos[servicoSelect.value] || '0,00';

        // Atualiza os textos no modal
        document.getElementById('resumo-servico').innerText = servicoNome;
        document.getElementById('resumo-profissional').innerText = profissionalNome;
        document.getElementById('resumo-valor').innerText = `R$ ${valorServico}`;

        // Define a chave PIX (simulada baseada no profissional)
        const chavePixSimulada = `${profissionalSelect.value}@salao.com.br`;
        inputChavePix.value = chavePixSimulada;

        // Gera o QR Code usando uma API pública
        // Na vida real, o backend geraria a string do "PIX Copia e Cola" (BR Code)
        const urlQrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${chavePixSimulada}`;
        qrCodeImg.src = urlQrCode;

        // Exibe o modal
        modalPix.classList.remove('hidden');
    });

    // Função para fechar o modal
    const fecharModal = () => {
        modalPix.classList.add('hidden');
    };

    btnFecharModal.addEventListener('click', fecharModal);
    btnCancelarModal.addEventListener('click', fecharModal);

    // Função para copiar a chave PIX
    btnCopiar.addEventListener('click', () => {
        // Seleciona o texto do input
        inputChavePix.select();
        inputChavePix.setSelectionRange(0, 99999); // Para dispositivos móveis

        // Copia para a área de transferência
        navigator.clipboard.writeText(inputChavePix.value).then(() => {
            // Feedback visual rápido
            const textoOriginal = btnCopiar.innerHTML;
            btnCopiar.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
            btnCopiar.style.backgroundColor = 'var(--success-green)';
            
            setTimeout(() => {
                btnCopiar.innerHTML = textoOriginal;
                btnCopiar.style.backgroundColor = 'var(--primary-blue)';
            }, 2000);
        });
    });

    // Alerta de sucesso provisório
    // Alerta de sucesso provisório e salvamento dos dados
    // Alerta de sucesso e salvamento dos dados na API
    document.getElementById('btn-pagamento-realizado').addEventListener('click', async () => {
        
        const servicoSelect = document.getElementById('servico');
        const profissionalSelect = document.getElementById('profissional');
        
        const novoAgendamento = {
            id: Date.now().toString(),
            cliente: document.getElementById('nome').value,
            servico: servicoSelect.options[servicoSelect.selectedIndex].text,
            profissional: profissionalSelect.options[profissionalSelect.selectedIndex].text,
            data: document.getElementById('data').value,
            horario: document.getElementById('horario').value
        };

        try {
            // Requisição POST para enviar os dados ao JSON Server
            await fetch('http://localhost:3000/agendamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoAgendamento)
            });

            alert('Agendamento confirmado com sucesso!');
            fecharModal();
            formAgendamento.reset(); 
            
            // Opcional: Descomente a linha abaixo para ir para a agenda automaticamente
            // window.location.href = 'agenda.html';

        } catch (erro) {
            console.error("Erro ao salvar agendamento:", erro);
            alert('Erro ao conectar com o servidor. Verifique se o JSON Server está rodando.');
        }
    });
});