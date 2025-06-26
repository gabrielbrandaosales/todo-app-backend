# ToDo Project - Fullstack Monorepo

![GitHub repo size](https://img.shields.io/github/repo-size/gabrielbrandaosales/todo-project?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/gabrielbrandaosales/todo-project?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/gabrielbrandaosales/todo-project?style=for-the-badge)

<img src="/frontend/public/frontendpreview.png" alt="Exemplo imagem">
> Este é o meu portfólio, que reúne minhas experiências profissionais, projetos pessoais e minha formação acadêmica.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] Adotar um pnpm workspaces ou npm workspaces
- [x] Criar um diretório packages/
- [ ] Centralizar o tsconfig.base.json no root
- [ ] Organizar scripts e ferramentas
- [ ] Deploy em Render

Projeto de estudo estruturado em monorepo, com backend desenvolvido em NestJS e frontend em React utilizando Vite para build rápido e eficiente.

- `backend/`: NestJS API RESTful para gerenciamento de tarefas, com rotas para criação, atualização, listagem e remoção de itens To Do, arquitetura modular e uso de TypeScript.

- `frontend/`: SPA com React + Vite aplicação responsiva, consumindo a API para exibir e manipular as tarefas, com foco em usabilidade e desempenho.

Monorepo: Organização unificada para facilitar o desenvolvimento, versionamento e deploy conjunto dos dois projetos.

Docker: Contêineres configurados para backend e frontend, garantindo ambiente isolado e consistente para desenvolvimento e deploy.

Objetivo: prática de arquitetura monorepo, integração entre backend e frontend modernos, uso de Docker para simplificar o setup e aplicação das melhores práticas em TypeScript.
