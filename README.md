
# Central de Serviços - README

## Visão Geral

Este projeto é uma Central de Serviços construída utilizando React.js para o frontend e Node.js/Express para o backend, com MongoDB como banco de dados. O sistema permite a integração de serviços de gerenciamento, como aprovação de tickets, controle de contas a pagar, entre outros.

Este guia explica como configurar o ambiente de desenvolvimento utilizando Docker, rodar tanto o backend quanto o frontend, e como criar o primeiro usuário e etapa no sistema.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado na sua máquina.
- [Node.js](https://nodejs.org/en/download/) instalado (versão recomendada 14.x ou superior).
- [npm](https://www.npmjs.com/get-npm) ou [yarn](https://yarnpkg.com/) instalado.

## Clonando o Projeto

Clone o repositório do projeto com o comando:
```bash
git clone https://github.com/oondemand/st-central-servicos.git
```

Em seguida, entre no diretório do projeto:
```bash
cd st-central-servicos
```

## Configuração do MongoDb
Para rodar o MongoDB utilizando Docker, execute o comando:
```bash
docker-compose up --build
```

Isso irá:

1. Construir a imagem Docker do backend.
2. Inicializar o banco de dados MongoDB.
3. Configurar os volumes e redes necessários.

## Configuração do Backend

1. Criar o .env

copiar o .env.exemplo e renomear para .env

2. Instalando Dependências do Backend:

Execute o comando para instalar as dependências:
```bash
npm install
```

3. Rodando o Backend:
```bash
npm run dev
```

O backend ficará disponível em: http://localhost:4000.

## Configuração do Frontend
No diretório frontend, siga os passos abaixo:

1. Instalar Dependências do Frontend:
```bash
npm install
```

2. Iniciar o Frontend:
Após a instalação das dependências, inicie o servidor de desenvolvimento:
```bash
npm start
```

O frontend ficará disponível em: http://localhost:3000.

## Utilizando a API
Após configurar o ambiente, você pode começar a interagir com a API.

### 1. Criar o Primeiro Usuário
Para criar o primeiro usuário no sistema, faça uma requisição POST para o endpoint abaixo:

Endpoint: POST http://127.0.0.1:4000/api/auth/seed

Body:
```bash
{
  "nome": "Suporte OonDemand",
  "email": "suporte@oondemand.com.br",
  "senha": "senha123",
  "status": "ativo"
}
```

### 2. Gerar o Token de Acesso
Endpoint: POST 127.0.0.1:4000/api/auth/login

Body:
```bash
{
  "email": "suporte@oondemand.com.br",
  "senha": "senha123"
}
```

O token gerado será utilizado para autenticar as requisições protegidas da API.

## 3. Acessar Endpoints Protegidos
Para acessar endpoints protegidos da API, como o cadastro de etapas, adicione o token no cabeçalho da requisição. Use o tipo de autenticação Bearer Token com o token gerado no login.

## 4. Criar a Primeira Etapa
Para criar uma nova etapa de workflow (ex: Aprovação), use a seguinte requisição:

Endpoint: POST http://127.0.0.1:4000/api/etapas

Body:
```bash
{
    "nome": "Aprovação",
    "codigo": "aprovacao",
    "posicao": 10
}
```

## Contribuindo

Contribuições são bem-vindas! Se você encontrar um bug ou tiver uma sugestão de melhoria, por favor, abra uma issue. Caso queira adicionar novas funcionalidades, faça um fork do repositório e envie um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.