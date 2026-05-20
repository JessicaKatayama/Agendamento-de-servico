# Agendamento de serviço

Um sistema de agendamento de serviços completo (Full-Stack) focado em responsividade, usabilidade e gestão de dados. A aplicação permite que clientes realizem agendamentos (com simulação de pagamento PIX) e que o administrador gerencie a agenda, os serviços e os profissionais oferecidos.

---

## 📋 Product Backlog

| ID | Prioridade | Item | Funcionalidade | Sprint |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Alta | Agendamento | Listagem de Serviços  | 1 |
| **02** | Alta | Agendamento | Calendário Dinâmico de Datas e Horários Disponíveis | 1 |
| **03** | Média | Pagamentos | Gerar QR code PIX  | 2 |
| **04** | Média | Agendamento | Filtro de Seleção por Profissional e tipo de serviço | 2 |
| **05** | Média | Agendamento | Visualização da Agenda | 3 |
| **06** | Média | Gerenciamento | Edição de preços, serviços e profissionais | 3 |

---

## 👤 User Stories

| ID | Título | Descrição (Como... Eu quero... Para...) | Critérios de Aceite |
| :--- | :--- | :--- | :--- |
| **US01** | **Agendar Serviço** | **Como** cliente, **eu quero** selecionar um serviço e um horário, **para que** eu garanta meu atendimento sem esperas. | - Bloquear horários já ocupados.<br> |
| **US02** | **Pagamento Online** | **Como** cliente, **eu quero** pagar antecipadamente, **para que** eu agilize minha saída após o serviço. | - Exibir QR code na tela.<br> |
| **US03** | **Perfil do Profissional** | **Como** cliente, **eu quero** ver a lista de serviços oferecidos, **para que** eu escolha o serviço | - Exibir nome do profissional.<br>- Listar serviços que ele realiza. |
| **US04** | **Gestão de Horários** | **Como** profissional, **eu quero** visualizar minha agenda, **para que** eu possa ver o meu horário. | Visualização e edição da agenda.<br> |
| **US05** | **Gestão de Serviços** | **Como** profissional, **eu quero** visualizar e editar os tipos de serviços oferecidos, os valores e os profissionais **para que** eu possa personalizar e atualizar os atendimentos | Visualização e edição de serviços.<br> |

---

## 💻 Protótipo

[Link para o protótipo no Figma](https://www.figma.com/make/eTPeAIKhrK6YjshvMLJ7QJ/Agendamento-de-Servi%C3%A7os?fullscreen=1&t=09RosGe4qwosjvvY-1)

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3, JavaScript (Vanilla).
* **Back-end:** Node.js com o framework Express.
* **Banco de Dados:** MySQL (relacional).
* **Dependências da API:** `express`, `mysql2`, `cors`.
* **Versionamento:** Git e GitHub.

---

## ⚙️ Pré-requisitos

Para rodar este projeto na sua máquina, você vai precisar ter instalado:
* [Node.js](https://nodejs.org/) (necessário para rodar o servidor e a API).
* [MySQL](https://dev.mysql.com/downloads/installer/) (banco de dados local).
* *Recomendado:* VS Code com a extensão "Live Server".

---

## 🚀 Como executar o projeto

Siga o passo a passo abaixo para configurar o ambiente e rodar a aplicação localmente:

### 1. Clonar o repositório

```bash
git clone [https://github.com/JessicaKatayama/Agendamento-de-servico.git](https://github.com/JessicaKatayama/Agendamento-de-servico.git)
```

### 2. Configurar o Banco de Dados (MySQL)
Abra o seu cliente MySQL (ex: MySQL Workbench ou terminal) e execute o script contido no arquivo `database.sql` que está na raiz deste projeto. Ele irá criar o banco de dados `salao_db`, gerar todas as tabelas necessárias e inserir os dados iniciais (incluindo o usuário administrador de teste). 

*Nota: Um usuário administrador de teste deve ser inserido na tabela `usuarios` para permitir o acesso à área de gestão.*

### 3. Iniciar o Servidor Back-end (API)
Abra o terminal na pasta raiz do projeto e instale as dependências do Node:

```bash
npm install
```

Verifique se a senha do seu MySQL está correta dentro do arquivo `server.js`. Em seguida, inicie o servidor:

```bash
node server.js
```
*O terminal exibirá a mensagem de que o servidor está rodando na porta 3001 e conectado ao banco de dados.*

### 4. Iniciar a Interface Front-end
Com o servidor Node.js rodando, abra a interface web:
Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.

---

## 📁 Estrutura de Pastas e Arquivos Principais

* `/css`: Contém os arquivos de estilização (`style.css`).
* `/js`: Contém a lógica de interface e requisições HTTP (`script.js`, `agenda.js`, `login.js`, `gerenciar.js`).
* `index.html`: Página principal de agendamento do cliente e geração de QR Code PIX.
* `login.html`: Tela de autenticação para proteção das rotas administrativas.
* `agenda.html`: Painel do administrador para visualização e cancelamento de agendamentos.
* `gerenciar.html`: Painel CRUD para cadastro, edição e exclusão de profissionais e serviços.
* `server.js`: Arquivo principal do Back-end, contendo a configuração do Express, conexão com o MySQL e todas as rotas da API REST.
* `package.json`: Gerenciador de dependências do Node.js.