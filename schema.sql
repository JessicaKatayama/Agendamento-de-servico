-- Criação do Banco de Dados
CREATE DATABASE salao_db;
USE salao_db;

-- 1. Tabela de Usuários (Administradores)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL
);

-- Insere o usuário de teste
INSERT INTO usuarios (login, senha) VALUES ('admin', '123456');

-- 2. Tabela de Agendamentos
CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    servico VARCHAR(50) NOT NULL,
    profissional VARCHAR(50) NOT NULL,
    data_agendamento DATE NOT NULL,
    horario TIME NOT NULL
);

-- 3. Tabela de Profissionais
CREATE TABLE profissionais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Insere dados iniciais de profissionais
INSERT INTO profissionais (nome) VALUES ('Carlos (Barbeiro)'), ('Ana Paula');

-- 4. Tabela de Serviços
CREATE TABLE servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);

-- Insere dados iniciais de serviços
INSERT INTO servicos (nome, preco) VALUES 
('Corte de Cabelo', 50.00), 
('Barba', 20.00), 
('Manicure', 35.00);