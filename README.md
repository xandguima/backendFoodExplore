# API do Food Explore

Porjeto promovido pelo curso explore da RocketSeat. O desafio final.

Esta é uma API de gerenciamento de rotas para a criação de usuários, pratos, ingredientes, likes e sessões. Desenvolvida com Node.js e JavaScript, a API permite a criação e o gerenciamento desses recursos.

## Requisitos

- Node.js (v14 ou superior)
- npm (gerenciador de pacotes Node)

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/xandguima/backendFoodExplore
    ```

2. Navegue para o diretório do projeto:

    ```bash
    cd backendFoodExplore
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

## Uso

Para iniciar a API, use o comando:

  ```bash
  npm start
  ```

A API estará disponível em `http://localhost:3333`.

## Endpoints Principais

### Usuários

- **Criar Usuário**
  - `POST /user`
  - Corpo da Requisição:

    ```json
    {
      "name": "Nome do Usuário",
      "email": "email@exemplo.com",
      "password": "senha"
    }
    ```

### Pratos

- **Criar Prato**
  - `POST /dish`
  - Corpo da Requisição:

    ```json
    {
      "name": "Nome do Prato",
      "category": "Categoria do prato",
      "description": "descrição do prato",
      "price": 19.99
    }
    ```
  - Resposta:

    ```json
    {
      "id": "id-do-prato",
    }
    ```

### Ingredientes

- **Adicionar Ingrediente**
  - `POST /ingredient/dish_id`
  - Corpo da Requisição:

    ```json
    {
      "ingredients": ["Nome do Ingrediente1","Nome do ingrediente2","..."]
    }
    ```

### Likes

- **Curtir Prato**
  - `POST /like`
  - Corpo da Requisição:

    ```json
    {
      "dish_id": "id-do-prato"
    }
    ```

### Sessões

- **Criar Sessão**
  - `POST /session`
  - Corpo da Requisição:

    ```json
    {
      "email": "email@exemplo.com",
      "password": "senha"
    }
    ```
  - Resposta:

    ```json
    {
      "user": "object",
      "token": "token-jwt"
    }
    ```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
