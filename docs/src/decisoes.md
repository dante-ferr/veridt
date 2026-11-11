# Decisões registradas

Registro do que a equipe fechou. O texto normativo dos requisitos continua em [veridit-req.pdf](https://github.com/RottyWheels/ESA_Trabalho/blob/main/veridit-req.pdf). Se este capítulo divergir do PDF, vale o PDF para o problema e este capítulo para o recorte de trabalho.

## 1. Implementação pedida

Em 2026-11-11 o desenvolvedor pediu o backend dos REQ 01 a REQ 05 e o merge de `feat/front` em `feat/back`. O código de aplicação existe a partir daí. As sugestões que bloqueavam a primeira linha foram adotadas neste capítulo.

## 2. Escopo REQ 01 a REQ 05

O backend cobre cadastrar usuário, recuperar senha, entrar, sair e comprar créditos até o faturamento. Os requisitos seguintes ficam fora até pedido explícito. Títulos desses requisitos estão no [roteiro](roadmap.md).

## 3. Arquitetura de referência, sem cópia

A arquitetura vigente é a do repositório [ESA_Trabalho](https://github.com/RottyWheels/ESA_Trabalho.git): estilo service-based, mono-repo, um serviço por contexto, camadas de API, aplicação, domínio e infraestrutura. Nenhum arquivo daquele repositório entra neste.

## 4. Sketch como fonte cautelosa

`veridt-sketch` foi a matéria-prima dos fluxos de identidade e do catálogo de créditos. A numeração ADR do sketch não corresponde à numeração REQ do PDF. Captura, worker, registros e evidências não entraram. O mapa está em [Mapa da arquitetura](arquitetura.md).

## 5. Idioma

Código em inglês. Este livro e o `README.md` em português. Rótulos visíveis do produto em português.

## 6. Consulta e SOLID

Decisão importante passa pelo desenvolvedor. Detalhe trivial não vira pergunta. O capítulo [SOLID](solid.md) guarda a estrutura adotada com o pedido de implementação.

## 7. Documentação enxuta

O livro registra método, decisão, mapa e roteiro no momento em que o trabalho muda. A skill usada está em `agents/skills/project-docs-book/`.

## 8. Stack

Fechada em 2026-11-11, com o pedido de implementação e a sugestão já registrada:

| Peça | Escolha |
| :--- | :--- |
| Linguagem | TypeScript |
| Interface | React com Vite, já presente em `feat/front` |
| Gateway | Fastify |
| Serviços | NestJS |
| Persistência | Prisma e PostgreSQL, um schema por serviço |
| Fila | RabbitMQ, só para o e-mail de identidade |
| E-mail local | Mailpit |

## 9. Fronteira do REQ 05

A compra grava o pacote escolhido e o faturamento. O estado do pedido fica `billing_recorded`. Não há cobrança, provedor, webhook nem saldo. Isso começa no REQ 06, que continua fora do escopo.

## 10. Confirmação de e-mail

O cadastro persiste a conta e publica `EmailConfirmationRequested`. O login responde `email_not_confirmed` até `POST /v1/accounts/confirmation`. O plano de arquitetura já previa esse passo, e o sketch faz o mesmo. A recuperação de senha publica `PasswordResetRequested`.

## 11. Nomes dos eventos

Os eventos deste recorte usam identificadores em inglês:

| Evento | Quando |
| :--- | :--- |
| `EmailConfirmationRequested` | Depois de um cadastro válido |
| `PasswordResetRequested` | Depois de um pedido de recuperação para uma conta existente |

A exchange é `veridt.events`. O emissor do JWT é `veridt-identity` e a audiência é `veridt`.

## O que ainda está aberto

| Item em aberto | Quando se resolve |
| :--- | :--- |
| Telas de cadastro, entrada, saída, recuperação e compra no `web/`. A API e o proxy `/v1` já existem. | Quando o desenvolvimento da interface pedir |
| Cada fatiamento SOLID que mude módulos, portas ou hierarquia além do que está em [SOLID](solid.md). | No momento em que a alternativa aparecer |
