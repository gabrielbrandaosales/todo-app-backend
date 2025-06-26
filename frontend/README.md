# 🎨 Frontend – ToDo Project

Interface web do projeto ToDo, desenvolvida com **React** e **Vite**, com foco em simplicidade, desempenho e componentização. Essa SPA consome a API RESTful do backend NestJS para gerenciar tarefas de forma intuitiva e responsiva.

![Frontend Preview](./public/frontendpreview.png)

---

## ⚙️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [ESLint](https://eslint.org/)
- [Nginx (build)](https://www.nginx.com/)
- [Docker](https://www.docker.com/)

---

## 🚀 Como rodar o projeto

### 🐳 Usando Docker (recomendado)

```bash
docker build -t todo-frontend .
docker run -p 5173:80 todo-frontend
