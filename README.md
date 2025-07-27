<p align="center">
  <h1 align="center">Find a Friend - Desafio 03</h1>
  <p align="center">Projeto desenvolvido durante a formação <strong>Node.js</strong>.</p>
</p>

<p align="center">
  <img src="https://img.shields.io/github/repo-size/felipe-dr/find-a-friend-api-fastify?style=for-the-badge&color=4e5acf" alt="Repo size" />
  <a aria-label="Last Commit" href="https://github.com/felipe-dr/find-a-friend-api-fastify/commits/main">
    <img src="https://img.shields.io/github/last-commit/felipe-dr/find-a-friend-api-fastify?style=for-the-badge&color=4e5acf" alt="Last commit on GitHub" />
  </a>
  <!-- <img src="https://img.shields.io/badge/license-MIT-4e5acf?style=for-the-badge" alt="License" /> -->
  <img src="https://img.shields.io/badge/status-concluído-green?style=for-the-badge" alt="Status" />
</p>

<br>

<p align="center">
  <a target="_blank" href="https://fastify.dev/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Fastify&message=TS&logo=fastify" alt="Fastify" />
  </a>
  <a target="_blank" href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Typescript&message=TS&logo=typescript" alt="Typescript" />
  </a>
  <a target="_blank" href="https://zod.dev/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Zod&message=TS&logo=zod" alt="Zod" />
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/dotenv">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Dotenv&message=TS&logo=dotenv" alt="Dotenv" />
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/bcryptjs">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Bcrypt&message=TS" alt="Bcrypt.js" />
  </a>
  <a target="_blank" href="https://eslint.org/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=ESLint&message=JS&logo=eslint" alt="ESLint" />
  </a>
  <a target="_blank" href="https://vite.dev/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Vite&message=TS&logo=vite" alt="Vite" />
  </a>
  <a target="_blank" href="https://vitest.dev/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Vitest&message=TS&logo=vitest" alt="Vitest" />
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/supertest">
    <img src="https://img.shields.io/static/v1?style=plastic&color=red&label=Supertest&message=TS&logo=supertest" alt="Supertest" />
  </a>
</p>

<p align="center">
  <a target="_blank" href="https://www.prisma.io/">
    <img src="https://img.shields.io/static/v1?style=plastic&color=yellow&label=Prisma&message=ORM&logo=prisma" alt="Prisma" />
  </a>
</p>

## Índice

<ol>
  <li><a href="#sobre">Sobre</a></li>
  <li><a href="#requisitos-e-funcionalidades">Requisitos e funcionalidades</a></li>
  <li><a href="#arquitetura">Arquitetura</a></li>
  <li><a href="#como-executar">Como executar</a></li>
  <li><a href="#tecnologias">Tecnologias</a></li>
  <li><a href="#autor">Autor</a></li>
</ol>

## Sobre

API desenvolvida no desafio 03 em Node.js com o Fastify e Typescript, afim de possibilitar a adoção de animais, sendo possível gerenciar pets, organizações e se autenticar.

## Requisitos e funcionalidades

### Funcionais

- [ ] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [ ] Deve ser possível filtrar pets por suas características;
- [ ] Deve ser possível visualizar detalhes de um pet para adoção;
- [x] Deve ser possível se cadastrar como uma organização;
- [ ] Deve ser possível realizar login como uma organização;
- [x] Deve ser possível obter dados do endereço através do fornecimento do CEP **( Adicional )**;

### Negócios

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [x] Uma organização precisa ter um endereço e um número de WhatsApp;
- [ ] Um pet deve estar ligado a uma organização;
- [ ] O usuário que quer adotar, entrará em contato com a organização via WhatsApp;
- [ ] Todos os filtros, além da cidade, são opcionais;
- [ ] Para uma organização acessar a aplicação como admin, ela precisa estar logada;
- [x] Ao cadastrar uma organização deve-se obter os dados da latitude e longitude de sua localização previamente para serem armazenados **( Adicional )**;

### Não funcionais

- [ ] O usuário deve ser identificado por um JWT;
- [ ] A senha do usuário deve ser criptografada;
- [ ] Todas as consultas que retornam listas de dados devem ser paginadas;

## Arquitetura

- SOLID
- Clean code
- Repository pattern
- Repository in memory

## Como executar

Se estiver utilizando outro gerenciador de pacotes, basta trocar o `pnpm` por `npm`, `yarn`, etc.

### Pré-requisitos

Instalar as dependências do projeto.

```bash
pnpm install
```

Criar arquivo `.env` na raiz do projeto.

```text
NODE_ENV=dev

# Auth
JWT_SECRET=findAFriend

# Database
DATABASE_URL="postgresql://docker:docker@localhost:5432/find_a_friend?schema=public"
```

### Testes

#### Unitário

```bash
pnpm test
```

#### E2E

```bash
pnpm test:e2e
```

#### Coverage

```bash
pnpm test:coverage
```

#### Visualização em UI

```bash
pnpm test:ui
```

### Localmente

Criar imagem com o docker compose.

```bash
docker-compose up
```

Executar as `migrations`.

```bash
npx prisma generate
```

```bash
npx prisma migrate deploy
```

Executar a aplicação.

```bash
pnpm start:dev
```

## Tecnologias

- [Node.js](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [ESLint](https://eslint.org/)
- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Prisma](https://www.prisma.io/)

> **DICA !**
>
> Todas as demais dependências utilizadas podem ser visualizados acessando o [package.json](./package.json).

## Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/felipe-dr">
        <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62888625?s=96&v=4" width="100px;" alt="Avatar do autor" />
        <br />
        <sub>
          <b>Felipe DR</b>
        </sub>
      </a>
      <br />
      <a href="mailto:felipe.corp7@gmail.com" title="E-mail">📩</a>
    </td>
  </tr>
</table>