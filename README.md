# Agendamento de serviço

## 📋 Product Backlog

| ID | Prioridade | Item | Funcionalidade | Sprint |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Alta | Agendamento | Listagem de Serviços  | 1 |
| **02** | Alta | Agendamento | Calendário Dinâmico de Datas e Horários Disponíveis | 1 |
| **03** | Média | Pagamentos | Gerar QR code PIX  | 2 |
| **04** | Média | Agendamento | Filtro de Seleção por Profissional e tipo de serviço | 2 |
| **05** | Média | Agendamento | Visualização da Agenda | 3 |

---

## 👤 User Stories

| ID | Título | Descrição (Como... Eu quero... Para...) | Critérios de Aceite |
| :--- | :--- | :--- | :--- |
| **US01** | **Agendar Serviço** | **Como** cliente, **eu quero** selecionar um serviço e um horário, **para que** eu garanta meu atendimento sem esperas. | - Bloquear horários já ocupados.<br> |
| **US02** | **Pagamento Online** | **Como** cliente, **eu quero** pagar antecipadamente, **para que** eu agilize minha saída após o serviço. | - Exibir QR code na tela.<br> |
| **US03** | **Perfil do Profissional** | **Como** cliente, **eu quero** ver a lista de serviços oferecidos, **para que** eu escolha o serviço | - Exibir nome do profissional.<br>- Listar serviços que ele realiza. |
| **US04** | **Gestão de Horários** | **Como** profissional, **eu quero** visualizar minha agenda, **para que** eu possa administrar o meu horário. | - Opção de "Indisponibilizar" horário.<br> |

## 💻 Prototipo

https://www.figma.com/make/eTPeAIKhrK6YjshvMLJ7QJ/Agendamento-de-Servi%C3%A7os?fullscreen=1&t=09RosGe4qwosjvvY-1


## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3, JavaScript (Vanilla).
* **Back-end (Mock):** [JSON Server](https://github.com/typicode/json-server) (Node.js).
* **Versionamento:** Git e GitHub.
* **Ícones:** FontAwesome.

## ⚙️ Pré-requisitos

Para rodar este projeto na sua máquina, você vai precisar ter instalado:
* [Node.js](https://nodejs.org/) (necessário para rodar o servidor local do banco de dados).
* Um navegador web atualizado.
* *Recomendado:* VS Code com a extensão "Live Server" para facilitar a visualização do front-end.

## 🚀 Como executar o projeto

Siga o passo a passo abaixo para rodar a aplicação localmente:

### 1. Clonar o repositório

```bash
git clone https://github.com/JessicaKatayama/Agendamento-de-servico.git
```

### 2. Iniciar o Banco de Dados (Back-end)
Abra o terminal na pasta raiz do projeto e execute o comando abaixo para iniciar o JSON Server. Ele irá criar a API simulada rodando na porta 3000 e escutando as alterações no arquivo `db.json`.

```bash
npx json-server --watch db.json --port 3000
```
*Nota: Mantenha este terminal aberto enquanto estiver usando a aplicação.*

### 3. Iniciar a Interface (Front-end)
Com o servidor rodando, você precisa abrir a interface web:
Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

---

## 📁 Estrutura de Pastas

* `/css`: Contém os arquivos de estilização da página.
* `/js`: Contém a lógica de requisições e interações do sistema.
* `index.html`: Página principal de agendamento e geração de QR Code PIX.
* `agenda.html`: Painel de visualização e cancelamento de agendamentos.
* `db.json`: Arquivo que atua como nosso banco de dados local.