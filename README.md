# GinTe CRUD

Este projeto é parte do teste para a GinTe em **React** com **Tailwind CSS**.

## 🚀 Tecnologias Utilizadas

- **React** (com Next.js)
- **Tailwind CSS**
- **Lucide React** (para ícones)
- **Prisma ORM** (para gerenciamento do banco de dados)
- **Docker** (para ambiente de banco de dados)

## 📦 Pré-requisitos

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

## 🛠 Estrutura do Projeto

```
/src
  ├── app
  │   ├── (home)
  │   │   ├── page.tsx  # Página principal
  ├── components
  │   ├── Modal.tsx  # Componente de Modal
  │   ├── DeleteConfirmationModal.tsx  # Modal de exclusão
```

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

## 📄 Licença

Este projeto está sob a licença **MIT**. Sinta-se à vontade para usá-lo e modificá-lo conforme necessário.

---

📧 Para dúvidas ou sugestões, entre em contato!

