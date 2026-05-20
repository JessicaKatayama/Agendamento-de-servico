const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Inicializa o aplicativo Express
const app = express();

// Configurações básicas
app.use(cors()); // Permite que o Front-end acesse a API
app.use(express.json()); // Permite que a API entenda dados em formato JSON

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '*JVads2025', 
    database: 'salao_db' 
});

// Testa a conexão com o banco de dados
db.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar com o MySQL:', erro);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com sucesso!');
});


// --- ROTAS DA API ---

// 1. CREATE (POST): Salva um novo agendamento no banco (COM VALIDAÇÃO)
app.post('/agendamentos', (req, res) => {
    const { cliente, servico, profissional, data, horario } = req.body;
    
    // PASSO A: O Comando SQL para verificar se o horário está ocupado
    const sqlVerificar = 'SELECT * FROM agendamentos WHERE profissional = ? AND data_agendamento = ? AND horario = ?';
    
    db.query(sqlVerificar, [profissional, data, horario], (erro, resultados) => {
        if (erro) {
            console.error('Erro ao verificar disponibilidade:', erro);
            return res.status(500).json({ erro: 'Erro interno no servidor' });
        }

        // Se 'resultados.length' for maior que 0, significa que o banco achou um agendamento igual!
        if (resultados.length > 0) {
            // Retornamos status 400 (Bad Request - Pedido Inválido) e a mensagem de erro
            return res.status(400).json({ erro: 'Este horário já está ocupado para este profissional. Escolha outro horário.' });
        }

        // PASSO B: Se passou pela validação (length é 0), fazemos o INSERT normalmente
        const sqlInsert = 'INSERT INTO agendamentos (cliente, servico, profissional, data_agendamento, horario) VALUES (?, ?, ?, ?, ?)';
        
        db.query(sqlInsert, [cliente, servico, profissional, data, horario], (erroInsert, resultadoInsert) => {
            if (erroInsert) {
                console.error('Erro ao salvar:', erroInsert);
                return res.status(500).json({ erro: 'Erro ao salvar no banco de dados' });
            }
            res.status(201).json({ mensagem: 'Agendamento criado com sucesso!', id: resultadoInsert.insertId });
        });
    });
});

// 2. READ (GET): Busca todos os agendamentos para a página de agenda
app.get('/agendamentos', (req, res) => {
    // Selecionamos os dados e formatamos a data para o padrão do front-end
    const sql = 'SELECT id, cliente, servico, profissional, DATE_FORMAT(data_agendamento, "%Y-%m-%d") AS data, horario FROM agendamentos';
    
    db.query(sql, (erro, resultados) => {
        if (erro) {
            console.error('Erro ao buscar:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar no banco de dados' });
        }
        res.json(resultados); // Envia a lista para o front-end
    });
});

// 3. DELETE (DELETE): Remove um agendamento específico pelo ID
app.delete('/agendamentos/:id', (req, res) => {
    const idParaDeletar = req.params.id;
    const sql = 'DELETE FROM agendamentos WHERE id = ?';
    
    db.query(sql, [idParaDeletar], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao deletar:', erro);
            return res.status(500).json({ erro: 'Erro ao deletar do banco de dados' });
        }
        res.json({ mensagem: 'Agendamento cancelado com sucesso!' });
    });
});

// Rota de teste simples para ver se o servidor está no ar
app.get('/', (req, res) => {
    res.send('API do Salão de Serviços está rodando!');
});

// 4. LOGIN (POST): Verifica as credenciais do administrador
app.post('/login', (req, res) => {
    // Pega o que foi enviado do front-end
    const { usuario, senha } = req.body;
    
    // Comando SQL para buscar alguém com esse exato login e senha
    const sql = 'SELECT * FROM usuarios WHERE login = ? AND senha = ?';
    
    db.query(sql, [usuario, senha], (erro, resultados) => {
        if (erro) {
            console.error('Erro ao verificar login:', erro);
            return res.status(500).json({ erro: 'Erro interno no servidor' });
        }

        // Se o tamanho dos resultados for maior que 0, a pessoa digitou certo!
        if (resultados.length > 0) {
            res.json({ mensagem: 'Login realizado com sucesso!', sucesso: true });
        } else {
            // Se for 0, não achou ninguém (senha ou usuário incorretos)
            // O status 401 significa "Unauthorized" (Não autorizado)
            res.status(401).json({ erro: 'Usuário ou senha incorretos.', sucesso: false });
        }
    });
});

// Define a porta onde o servidor vai rodar (vamos usar a 3001 para não confundir com o antigo)
const PORTA = 3001;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORTA}`);
});

// --- ROTAS DE GESTÃO DE PROFISSIONAIS ---

// Listar todos os profissionais
app.get('/profissionais', (req, res) => {
    const sql = 'SELECT * FROM profissionais';
    db.query(sql, (erro, resultados) => {
        if (erro) {
            console.error('Erro ao buscar profissionais:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar profissionais' });
        }
        res.json(resultados);
    });
});

// Cadastrar um novo profissional (Ex: Lúcia)
app.post('/profissionais', (req, res) => {
    const { nome } = req.body;
    const sql = 'INSERT INTO profissionais (nome) VALUES (?)';
    db.query(sql, [nome], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao cadastrar profissional:', erro);
            return res.status(500).json({ erro: 'Erro ao cadastrar profissional' });
        }
        res.status(201).json({ mensagem: 'Profissional cadastrado!', id: resultado.insertId });
    });
});

// Deletar um profissional
app.delete('/profissionais/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM profissionais WHERE id = ?';
    db.query(sql, [id], (erro) => {
        if (erro) {
            console.error('Erro ao deletar profissional:', erro);
            return res.status(500).json({ erro: 'Erro ao deletar profissional' });
        }
        res.json({ mensagem: 'Profissional removido com sucesso!' });
    });
});


// --- ROTAS DE GESTÃO DE SERVIÇOS ---

// Listar todos os serviços
app.get('/servicos', (req, res) => {
    const sql = 'SELECT * FROM servicos';
    db.query(sql, (erro, resultados) => {
        if (erro) {
            console.error('Erro ao buscar serviços:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar serviços' });
        }
        res.json(resultados);
    });
});

// Cadastrar um novo serviço (Ex: Hidratação)
app.post('/servicos', (req, res) => {
    const { nome, preco } = req.body;
    const sql = 'INSERT INTO servicos (nome, preco) VALUES (?, ?)';
    db.query(sql, [nome, preco], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao cadastrar serviço:', erro);
            return res.status(500).json({ erro: 'Erro ao cadastrar serviço' });
        }
        res.status(201).json({ mensagem: 'Serviço cadastrado!', id: resultado.insertId });
    });
});

// Editar um serviço (Perfeito para mudar o valor do Corte de Cabelo!)
app.put('/servicos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    
    // O comando UPDATE altera os campos informados onde o ID bater
    const sql = 'UPDATE servicos SET nome = ?, preco = ? WHERE id = ?';
    db.query(sql, [nome, preco, id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao atualizar serviço:', erro);
            return res.status(500).json({ erro: 'Erro ao atualizar serviço' });
        }
        res.json({ mensagem: 'Serviço atualizado com sucesso!' });
    });
});

// Deletar um serviço
app.delete('/servicos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM servicos WHERE id = ?';
    db.query(sql, [id], (erro) => {
        if (erro) {
            console.error('Erro ao deletar serviço:', erro);
            return res.status(500).json({ erro: 'Erro ao deletar serviço' });
        }
        res.json({ mensagem: 'Serviço removido com sucesso!' });
    });
});