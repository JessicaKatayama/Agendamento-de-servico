document.addEventListener('DOMContentLoaded', () => {
    carregarServicos();
    carregarProfissionais();

    // Evento para cadastrar Serviço
    document.getElementById('form-servico').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome-servico').value;
        const preco = document.getElementById('preco-servico').value;

        await fetch('http://localhost:3001/servicos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, preco })
        });
        
        document.getElementById('form-servico').reset();
        carregarServicos(); // Recarrega a lista
    });

    // Evento para cadastrar Profissional
    document.getElementById('form-profissional').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome-profissional').value;

        await fetch('http://localhost:3001/profissionais', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome })
        });
        
        document.getElementById('form-profissional').reset();
        carregarProfissionais();
    });
});

// --- FUNÇÕES DE SERVIÇOS ---
async function carregarServicos() {
    const resposta = await fetch('http://localhost:3001/servicos');
    const servicos = await resposta.json();
    const lista = document.getElementById('lista-servicos');
    lista.innerHTML = '';

    servicos.forEach(servico => {
        lista.innerHTML += `
            <li class="agenda-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;">
                <span><strong>${servico.nome}</strong> - R$ ${parseFloat(servico.preco).toFixed(2)}</span>
                <div>
                    <button onclick="editarPreco(${servico.id}, '${servico.nome}', ${servico.preco})" class="btn-secondary" style="padding: 5px 10px; margin-right: 5px;"><i class="fa-solid fa-pen"></i> Editar</button>
                    <button onclick="deletarServico(${servico.id})" class="btn-danger" style="padding: 5px 10px;"><i class="fa-solid fa-trash"></i></button>
                </div>
            </li>
        `;
    });
}

async function editarPreco(id, nome, precoAtual) {
    // Abre uma caixinha nativa para o administrador digitar o novo preço
    const novoPreco = prompt(`Digite o novo preço para "${nome}":`, precoAtual);
    
    // Se o usuário digitou algo e não clicou em cancelar
    if (novoPreco !== null && novoPreco !== "") {
        await fetch(`http://localhost:3001/servicos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: nome, preco: parseFloat(novoPreco) })
        });
        carregarServicos(); // Atualiza a tela
    }
}

async function deletarServico(id) {
    if (confirm("Tem certeza que deseja deletar este serviço?")) {
        await fetch(`http://localhost:3001/servicos/${id}`, { method: 'DELETE' });
        carregarServicos();
    }
}

// --- FUNÇÕES DE PROFISSIONAIS ---
async function carregarProfissionais() {
    const resposta = await fetch('http://localhost:3001/profissionais');
    const profissionais = await resposta.json();
    const lista = document.getElementById('lista-profissionais');
    lista.innerHTML = '';

    profissionais.forEach(prof => {
        lista.innerHTML += `
            <li class="agenda-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;">
                <span>${prof.nome}</span>
                <button onclick="deletarProfissional(${prof.id})" class="btn-danger" style="padding: 5px 10px;"><i class="fa-solid fa-trash"></i></button>
            </li>
        `;
    });
}

async function deletarProfissional(id) {
    if (confirm("Tem certeza que deseja deletar este profissional?")) {
        await fetch(`http://localhost:3001/profissionais/${id}`, { method: 'DELETE' });
        carregarProfissionais();
    }
}