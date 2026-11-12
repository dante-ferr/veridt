# Decisões registradas

Registro do que a equipe fechou. O texto normativo dos requisitos continua em [veridit-req.pdf](https://github.com/RottyWheels/ESA_Trabalho/blob/main/veridit-req.pdf). Se este capítulo divergir do PDF, vale o PDF para o problema e este capítulo para o recorte de trabalho.

## 1. Implementação pedida

Em 2026-11-11 o desenvolvedor pediu o backend dos REQ 01 a REQ 05 (`feat/back`) e as telas desses requisitos (`feat/front`). As duas branches foram unidas em `merge/front-back`. O código de aplicação existe a partir daí. As sugestões que bloqueavam a primeira linha foram adotadas neste capítulo.

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

| Peça         | Escolha                                    |
| :----------- | :----------------------------------------- |
| Linguagem    | TypeScript                                 |
| Interface    | React com Vite (detalhe no item 12)        |
| Gateway      | Fastify                                    |
| Serviços     | NestJS                                     |
| Persistência | Prisma e PostgreSQL, um schema por serviço |
| Fila         | RabbitMQ, só para o e-mail de identidade   |
| E-mail local | Mailpit                                    |

## 9. Fronteira do REQ 05

A compra grava o pacote escolhido e o faturamento. O estado do pedido fica `billing_recorded`. Não há cobrança, provedor, webhook nem saldo. Isso começa no REQ 06, que continua fora do escopo.

## 10. Confirmação de e-mail

O cadastro persiste a conta e publica `EmailConfirmationRequested`. O login responde `email_not_confirmed` até `POST /v1/accounts/confirmation`. O plano de arquitetura já previa esse passo, e o sketch faz o mesmo. A recuperação de senha publica `PasswordResetRequested`.

## 11. Nomes dos eventos

Os eventos deste recorte usam identificadores em inglês:

| Evento                       | Quando                                                      |
| :--------------------------- | :---------------------------------------------------------- |
| `EmailConfirmationRequested` | Depois de um cadastro válido                                |
| `PasswordResetRequested`     | Depois de um pedido de recuperação para uma conta existente |

A exchange é `veridt.events`. O emissor do JWT é `veridt-identity` e a audiência é `veridt`.

## 12. Stack da interface web

Decidido em 2026-11-11. A interface web (C01) fica em `web/`, como workspace npm do mono-repo:

- React com Vite e TypeScript, gerando uma SPA estática.
- Tailwind CSS v4, pelo plugin `@tailwindcss/vite`.
- shadcn/ui sobre Radix (estilo `radix-nova`), com ícones Lucide. Os componentes ficam em `web/src/components/ui/` e o alias `@` aponta para `web/src/`.

O visual segue as telas do Figma do repositório de referência. A paleta e as fontes (IBM Plex Sans e Mono) vêm de `web/src/styles/tokens.css` do sketch e ficam em `web/src/index.css`. As variáveis do shadcn apontam para essa paleta, e as cores da marca também viram utilitários do Tailwind (`bg-seal`, `text-ink-muted`, `border-line` etc.).

## 13. Rotas

Decidido em 2026-11-11. As rotas usam `react-router` e ficam em `web/src/app/router.tsx`: `/` e `/login` levam ao login, `/register` ao cadastro, `/forgot-password` e `/reset-password?token=` cobrem a recuperação de senha, e `/records` é uma tela vazia que serve só de destino depois do login. Listar registros (REQ 12) continua fora do escopo. As telas de login, cadastro e recuperação de senha estão prontas, mas as funções de `web/src/services/auth.ts` ainda são stubs que lançam erro. A ligação com a API de [Fluxos](fluxos.md) é o próximo passo.

## 14. Formulários e estado global

Decidido em 2026-11-11. Formulários usam `react-hook-form` com validação por schema `zod`. Estado global usa `zustand`, adotado só quando alguma tela precisar dele.

## 15. Tela de cadastro

Decidido em 2026-11-11. O formulário pede tipo de conta (advogado ou usuário comum), nome, e-mail, CPF (com dígitos verificadores), OAB no formato `UF 000000` só para advogado, senha com no mínimo 8 caracteres e aceite dos termos.

## 16. Área logada e comprar créditos

Decidido em 2026-11-11. As telas logadas usam `AppLayout` (`web/src/components/layout/`), com o header do sketch: marca, links Registros, Novo registro, Créditos e Minha conta, saldo, nome e Sair. Registros, Novo registro e Minha conta são telas vazias por enquanto e ficam fora do escopo. O header é estático (nome fixo, saldo 0, Sair volta ao login) até a integração com o backend.

A tela `/credits` (REQ 05, passo 1) lista os pacotes de `web/src/services/credits.ts`, fixos no código como no enunciado, e mostra o histórico de compras com pedidos simulados. O pacote escolhido fica numa store `zustand` (`web/src/stores/credit-purchase-store.ts`), persistida no `sessionStorage`, para a tela de faturamento usar.

A tela `/credits/billing` (passo 2) pede comprador e endereço com as mesmas regras do `POST /v1/credit-orders`. Quando o envio dá certo, a seleção é limpa e a tela volta para `/credits`. O passo 3, pagamento, aparece nos passos mas é o REQ 06.

## 17. Sessão com refresh token em cookie

Decidido em 2026-11-12. O refresh token sai do corpo das respostas e vai para um cookie `HttpOnly`, fora do alcance de JavaScript. O access token fica em memória na interface, numa store `zustand`. O logout passou a ser rota pública no gateway e revoga a sessão pelo cookie, sem depender do access token. O refresh token não é trocado a cada uso; a rotação fica para depois. Detalhe em [Fluxos](fluxos.md).

## 18. Integração da interface com a API

Decidido em 2026-11-12. A interface chama a API com `axios` (`web/src/lib/http.ts`, base `/v1`) e guarda as respostas com TanStack Query. Cada chamada tem um hook em `web/src/hooks/<domínio>/`: `useGet…` para leitura (`useQuery`) e `use<Ação>` para escrita (`useMutation`), como `useSignIn`, `useRegister` e `useBuyCredits`. As chaves de cache usam `@lukemorales/query-key-factory`: cada domínio declara as suas em `hooks/<domínio>/keys.ts` e `web/src/lib/query-keys.ts` junta tudo em `queryKeys`. Os tipos da API são escritos à mão em `web/src/services/`.

O access token fica na store `zustand` de sessão, só em memória. Um interceptor do axios põe o Bearer e, numa resposta 401, faz um único refresh pelo cookie (compartilhado entre requisições simultâneas) e repete a requisição. Se o refresh falhar, a sessão é limpa.

A guarda de rotas usa o `middleware` do React Router (`web/src/app/middleware/`): `requireSession` nas telas logadas e `redirectIfAuthenticated` em entrar, cadastrar e recuperar senha. Ao abrir o app, o middleware tenta o refresh uma vez para restaurar a sessão. É proteção de experiência; quem protege os dados é o gateway.

Os erros da API são traduzidos pelo código (`web/src/lib/api-error.ts`) e vão para o campo do formulário quando há um campo correspondente. O saldo do header fica fixo em 0 no front até existir pagamento. No histórico de compras, a coluna Forma mostra "—" e o estado `billing_recorded` aparece como "FATURAMENTO · Registrado".

## O que ainda está aberto

| Item em aberto                                                                                                            | Quando se resolve                        |
| :------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------- |
| Saldo de créditos. O header mostra 0 fixo; não há endpoint porque nenhum crédito é concedido antes do pagamento (REQ 06). | Quando o pagamento entrar no escopo      |
| Cada fatiamento SOLID que mude módulos, portas ou hierarquia além do que está em [SOLID](solid.md).                       | No momento em que a alternativa aparecer |
