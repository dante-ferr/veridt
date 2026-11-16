# Veridt

Site do Veridt. A interface web fica em `web/` (Vite, React, TypeScript, Tailwind e shadcn/ui). O plano de trabalho está em `AGENTS.md`. O método está no livro em `docs/`.

## Desenvolvimento local

Com Docker instalado, use um único comando para subir o backend (Compose em segundo plano) e o front (Vite no terminal):

```bash
npm install
make dev
```

Equivalente com npm:

```bash
npm run dev
```

O Vite fica em `http://localhost:5173` e encaminha `/v1` para o gateway em `http://localhost:8080`. Os e-mails locais aparecem no Mailpit em `http://localhost:8025`. O comportamento da API está em `docs/src/fluxos.md`.

Ao encerrar o Vite (Ctrl+C), os containers continuam rodando. Para parar a stack:

```bash
make down
```

### Comandos separados

Se preferir dois terminais ou só uma parte da stack:

| Comando | O que faz |
| :--- | :--- |
| `make up` | Sobe só o backend (Compose em primeiro plano, com logs no terminal) |
| `make web-dev` ou `npm run dev:web` | Sobe só o Vite (exige o backend já no ar) |
| `make logs` | Acompanha os logs do Compose |
| `make down` | Para e remove os containers da stack |

Para rodar apenas a interface, sem backend:

```bash
npm run dev:web
```

O enunciado e a arquitetura de referência ficam em [ESA_Trabalho](https://github.com/RottyWheels/ESA_Trabalho.git). Este repositório não copia aqueles arquivos.

## Livro (`docs/`)

```bash
make docs-serve
```

O servidor abre em `http://localhost:3000`.