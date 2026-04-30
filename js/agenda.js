document.addEventListener('DOMContentLoaded', () => {
    const listaAgendaContainer = document.getElementById('lista-agenda');
    const totalText = document.getElementById('total-agendamentos');
    const btnLimparTodos = document.getElementById('btn-limpar-todos');

    let agendamentos = [];

    const formatarDataExtenso = (dataISO) => {
        if (!dataISO) return '';
        const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia} de ${meses[parseInt(mes) - 1]} de ${ano}`;
    };

    // Função que busca os dados da API (GET)
    const carregarAgendamentos = async () => {
        try {
            const resposta = await fetch('http://localhost:3000/agendamentos');
            agendamentos = await resposta.json();
            renderizarAgenda();
        } catch (erro) {
            console.error("Erro ao buscar dados:", erro);
            listaAgendaContainer.innerHTML = '<p class="text-muted" style="text-align: center;">Erro ao conectar com o servidor.</p>';
        }
    };

    const renderizarAgenda = () => {
        listaAgendaContainer.innerHTML = '';
        totalText.innerText = `Total de agendamentos: ${agendamentos.length}`;

        if (agendamentos.length === 0) {
            listaAgendaContainer.innerHTML = '<p class="text-muted" style="text-align: center; padding: 2rem;">Nenhum agendamento encontrado.</p>';
            return;
        }

        const agrupados = agendamentos.reduce((acc, agendamento) => {
            if (!acc[agendamento.profissional]) acc[agendamento.profissional] = [];
            acc[agendamento.profissional].push(agendamento);
            return acc;
        }, {});

        for (const [profissional, lista] of Object.entries(agrupados)) {
            const grupoDiv = document.createElement('div');
            grupoDiv.className = 'profissional-group';

            let itensHTML = lista.map(item => `
                <div class="agendamento-item">
                    <div class="agendamento-info">
                        <span class="info-line"><strong><i class="fa-regular fa-user"></i> ${item.cliente}</strong></span>
                        <span class="info-line secondary"><i class="fa-solid fa-scissors"></i> ${item.servico}</span>
                    </div>
                    <div class="agendamento-actions">
                        <div class="agendamento-data">
                            <span class="info-line secondary"><i class="fa-regular fa-calendar"></i> ${formatarDataExtenso(item.data)}</span>
                            <span class="info-line"><i class="fa-regular fa-clock"></i> ${item.horario}</span>
                        </div>
                        <button class="btn-icon-danger" onclick="deletarAgendamento('${item.id}')" title="Cancelar Agendamento">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `).join('');

            grupoDiv.innerHTML = `
                <div class="profissional-header">
                    <h3><i class="fa-regular fa-user"></i> ${profissional}</h3>
                    <p>${lista.length} ${lista.length > 1 ? 'agendamentos' : 'agendamento'}</p>
                </div>
                <div class="agendamentos-list">
                    ${itensHTML}
                </div>
            `;
            listaAgendaContainer.appendChild(grupoDiv);
        }
    };

    // Função que avisa a API para deletar um item específico (DELETE)
    window.deletarAgendamento = async (idParaDeletar) => {
        if(confirm('Tem certeza que deseja cancelar este agendamento?')) {
            try {
                await fetch(`http://localhost:3000/agendamentos/${idParaDeletar}`, {
                    method: 'DELETE'
                });
                carregarAgendamentos(); // Recarrega a lista do servidor após deletar
            } catch (erro) {
                console.error("Erro ao deletar:", erro);
            }
        }
    };

    // Apagar todos os agendamentos um por um (JSON Server não tem "DELETE ALL" nativo)
    btnLimparTodos.addEventListener('click', async () => {
        if(agendamentos.length > 0 && confirm('Atenção: Isso irá apagar TODOS os agendamentos. Deseja continuar?')) {
            try {
                for (let agendamento of agendamentos) {
                    await fetch(`http://localhost:3000/agendamentos/${agendamento.id}`, { method: 'DELETE' });
                }
                carregarAgendamentos();
            } catch (erro) {
                console.error("Erro ao limpar agenda:", erro);
            }
        }
    });

    // Inicia buscando os dados
    carregarAgendamentos();
});