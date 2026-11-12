# Veridt

Site do Veridt. A interface web fica em `web/` (Vite, React, TypeScript, Tailwind e shadcn/ui). O plano de trabalho está em `AGENTS.md`. O método está no livro em `docs/`.

O backend dos REQ 01 a REQ 05 sobe com:

```bash
make up
```

O gateway fica em `http://localhost:8080`. O Vite, em outro terminal, fica em `http://localhost:5173` e encaminha `/v1` para o gateway:

```bash
make web-dev
```

Os e-mails locais aparecem em `http://localhost:8025`. O comportamento da API está em `docs/src/fluxos.md`.

O enunciado e a arquitetura de referência ficam em [ESA_Trabalho](https://github.com/RottyWheels/ESA_Trabalho.git). Este repositório não copia aqueles arquivos.

Para ler o livro localmente:

```bash
make docs-serve
```

O servidor abre em `http://localhost:3000`.

Para rodar só a interface, sem backend:

```bash
npm install
npm run dev:web
```
