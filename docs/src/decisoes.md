# Decisões registradas

Registro do que a equipe fechou em 2026-11-11. O texto normativo dos requisitos continua em [veridit-req.pdf](https://github.com/RottyWheels/ESA_Trabalho/blob/main/veridit-req.pdf). Se este capítulo divergir do PDF, vale o PDF para o problema e este capítulo para o recorte de trabalho.

## 1. Só o plano, por enquanto

Não há código de aplicação. O primeiro entregável é este livro e o `AGENTS.md`. A implementação começa quando o desenvolvedor pedir.

## 2. Escopo REQ 01 a REQ 05

O site cobre cadastrar usuário, recuperar senha, entrar, sair e comprar créditos. Os requisitos seguintes ficam fora até pedido explícito. Títulos desses requisitos estão no [roteiro](roadmap.md), só para marcar a fronteira.

## 3. Arquitetura de referência, sem cópia

A arquitetura vigente é a do repositório [ESA_Trabalho](https://github.com/RottyWheels/ESA_Trabalho.git): estilo service-based, mono-repo, um serviço por contexto, camadas de API, aplicação, domínio e infraestrutura. Nenhum arquivo daquele repositório entra neste.

## 4. Sketch como fonte cautelosa

Se `veridt-sketch` estiver disponível, ele é matéria-prima dos fluxos de identidade e da parte de créditos que couber no escopo. A numeração ADR do sketch não corresponde à numeração REQ do PDF. Captura, worker, registros e evidências do sketch ficam de fora. O mapa está em [Mapa da arquitetura](arquitetura.md).

## 5. Idioma

Código em inglês. Este livro e o `README.md` em português. Rótulos visíveis do produto em português.

## 6. Consulta e SOLID

Decisão importante passa pelo desenvolvedor. Detalhe trivial não vira pergunta. Sugestões SOLID não são licença para introduzir abstração. O capítulo [SOLID](solid.md) guarda sugestões e, quando existirem, decisões.

## 7. Documentação enxuta

O livro registra método, decisão, mapa e roteiro no momento em que o trabalho muda. A skill usada está em `agents/skills/project-docs-book/`. Ela não depende de um editor específico.

## O que ainda está aberto

| Item em aberto | Quando se resolve |
| :--- | :--- |
| Stack (linguagem, framework de serviço, ORM, biblioteca de interface). `tecnologias.md` do repositório de referência é proposta. Sugestão: a stack já usada no sketch para os serviços deste escopo (TypeScript, React com Vite, gateway Fastify, serviços NestJS, Prisma, PostgreSQL, RabbitMQ), confirmada antes de escrever código. | Antes da primeira linha de código de aplicação |
| Fronteira entre comprar créditos (REQ 05) e efetuar pagamento (REQ 06). Sugestão: escolher pacote e gravar faturamento; não executar pagamento. | Antes de implementar a compra de créditos |
| Confirmação de e-mail no cadastro. O plano de arquitetura prevê esse passo. O recorte mínimo do REQ 01 é persistir a conta válida. | Antes de implementar o cadastro |
| Nomes dos eventos. O catálogo de referência usa nomes em português. O código deste repositório é em inglês. | Antes do primeiro evento |
| Cada fatiamento SOLID que mude módulos, portas ou hierarquia. | No momento em que a alternativa aparecer |
