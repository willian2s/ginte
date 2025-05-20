# GinTe CRUD

Este projeto é parte do teste para a GinTe em **React** com **Tailwind CSS**

## 🚀 Tecnologias Utilizadas

- **React** (com Next.js)
- **Tailwind CSS**
- **Lucide React** (para ícones)
- **Prisma ORM** (para gerenciamento do banco de dados)
- **Docker** (para ambiente de banco de dados)

## 📛 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18+ recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (para rodar o banco de dados)

## 📥 Instalação

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/willian2s/ginte.git
   ```

2. **Acesse a pasta do projeto:**

   ```sh
   cd ginte
   ```

3. **Instale as dependências:**

   ```sh
   npm install
   ```
   Ou, se estiver utilizando **Yarn**:
   ```sh
   yarn install
   ```

## 🏃‍♂️ Executando o Projeto

### Iniciar o ambiente de desenvolvimento

1. **Suba os containers do Docker:**
   ```sh
   npm run compose:up
   ```

2. **Execute as migrações do banco de dados:**
   ```sh
   npx prisma migrate dev
   ```

3. **Gere os modelos do Prisma:**
   ```sh
   npm run db:generate
   ```

4. **Popule o banco de dados com dados iniciais (se necessário):**
   ```sh
   npm run db:seed
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```

O projeto estará disponível em `http://localhost:3000`.

## 🛠 Roteiro de Testes

### 1. Criar uma Conta
1. Acesse `http://localhost:3000/register`.
2. Preencha os campos com nome, e-mail e senha.
3. Clique no botão **"Cadastrar"**.
4. Verifique se o sistema redireciona para a tela de login e exibe uma mensagem de sucesso.

### 2. Login
1. Acesse `http://localhost:3000/login`.
2. Insira o e-mail e a senha cadastrados.
3. Clique no botão **"Entrar"**.
4. Verifique se o sistema redireciona para a dashboard.

### 3. Criar um Cliente
1. Acesse `http://localhost:3000/customer`.
2. Preencha os dados do cliente.
3. Clique em **"Salvar"**.
4. Confirme se o cliente aparece na listagem.

### 4. Editar um Cliente
1. Na lista de clientes, clique em **"Editar"** em um cliente existente.
2. Modifique os dados e clique em **"Salvar"**.
3. Confirme se as alterações foram salvas corretamente.

### 5. Excluir um Cliente
1. Na lista de clientes, clique em **"Excluir"**.
2. Confirme a exclusão.
3. Verifique se o cliente foi removido da listagem.

### 6. Logout
1. Clique no botão **"Sair"** no menu lateral.
2. Verifique se o sistema redireciona para a tela de login.

## 🎨 Personalização

Se precisar ajustar estilos, edite os arquivos em `src/components` e utilize as classes do **Tailwind CSS** conforme necessário.

## 🐞 Debugging

Caso encontre algum problema, siga estas verificações:

- **Dependências instaladas corretamente?**
  ```sh
  ls node_modules
  ```
  Se estiver vazio, reinstale:
  ```sh
  npm install
  ```

- **O banco de dados está rodando corretamente?**
  ```sh
  docker ps
  ```
  Se o container do banco não estiver rodando, reinicie:
  ```sh
  npm run compose:up
  ```

- **Erros no console?**
  - Verifique o console do navegador para mensagens de erro.
  - Cheque os logs do servidor no terminal.

## 📝 Licença

Este projeto está sob a licença **MIT**. Sinta-se à vontade para usá-lo e modificá-lo conforme necessário.

---

📧 Para dúvidas ou sugestões, entre em contato!

