# Veridt

Este arquivo é o plano do projeto. Agentes e desenvolvedores seguem este plano até o desenvolvedor o alterar. O livro em `docs/` registra o método. Se o livro e este arquivo divergirem sobre o método, vale o que estiver mais recente e explícito; na dúvida, pergunte.

O backend dos REQ 01 a REQ 05 está no repositório, e as telas desses requisitos estão em `web/` (Vite, React, TypeScript, Tailwind e shadcn/ui), ainda com serviços simulados. Não amplie o escopo para os requisitos seguintes enquanto o desenvolvedor não pedir.

## Texto do plano

O plano abaixo é o pedido do desenvolvedor, registrado na íntegra em 2026-11-11.

> Regras e definições básicas para você registrar no AGENTS.md. Não faça o código ainda: apenas registre o plano!!!
>
> Obtenha as referências arquiteturais (devem ser seguidas durante todo o projeto) em https://github.com/RottyWheels/ESA_Trabalho.git. Não coloque coisas desse repositório neste, para não poluir os arquivos.
> O objetivo é criar um site implementando APENAS REQ 01, REQ 02, REQ03, REQ04, REQ05 (no pdf do repositório de referência está informando). NÃO IMPLEMENTE os outros requisitos a não ser que eu solicite. Utilize a arquitetura planejada no repositório com a URL especificada. Utilize subagents para delegar tarefas mais simples, preferencialmente com modelos menos custosos.
> Faça todos os códigos em inglês. Exceção: documentação (no subdiretório docs/ e README) em português.
> Registrar coisas técnicas importantes tanto para devs quanto para agents nos docs conforme a aplicação for sendo desenvolvida, sendo o mais enxuto possível. Utilize a skill /project-docs-book para fazer os docs. Aliás, deixe essa skill numa pasta para agents, para outros desenvolvedores terem acesso.
> Sempre que uma decisão importante precisar ser tomada, consulte o desenvolvedor antes.
> Esse projeto deve seguir à risca os princípios SOLID. Sempre que a implementação do SOLID for necessária, deixe o desenvolvedor decidir, em vez de implementá-lo arbitrariamente. Mas não pergunte de forma exaustiva coisas mais triviais e banais, para não gastar tempo excessivo do desenvolvedor. Documente as suas sugestões e decisões tomadas com relação ao SOLID, também.
> Utilize, se disponível, o repositório veridt-sketch, pois ele já tem muita coisa a ser implementada aqui e vai ajudar a poupar tokens. O objetivo é aplicar esse código com mais cautela aqui.

Complemento do mesmo plano:

> Só pra constar: a utilização do veridt-sketch, bem como todo o prompt que te passei, devem ser registrados como plano no AGENTS.md

## Autoridade

| Fonte | O que decide |
| :--- | :--- |
| [ESA_Trabalho](https://github.com/RottyWheels/ESA_Trabalho.git) | Arquitetura e enunciado do produto. O PDF `veridit-req.pdf` é o texto dos requisitos. |
| Este arquivo | Plano de trabalho: escopo, idioma, consulta, SOLID, uso do sketch. |
| `docs/` | Método escolhido neste repositório, em português, enxuto. |
| Código | Obedece ao método. Se o código divergir do livro, corrija o código ou atualize o livro quando o método tiver mudado de propósito. |

Não copie arquivos, diagramas, telas nem o PDF do repositório de referência para cá. Aponte a URL. O enunciado normativo permanece lá.

Arquivos de autoridade, para leitura no repositório de referência:

- [veridit-req.pdf](https://github.com/RottyWheels/ESA_Trabalho/blob/main/veridit-req.pdf)
- [README.md](https://github.com/RottyWheels/ESA_Trabalho/blob/main/README.md)
- [ADR-011](https://github.com/RottyWheels/ESA_Trabalho/blob/main/docs/adr/ADR-011-estilo-arquitetural-service-based.md)
- [ADR-009](https://github.com/RottyWheels/ESA_Trabalho/blob/main/docs/adr/ADR-009-extensibilidade-manutenibilidade.md)
- [ADR-001](https://github.com/RottyWheels/ESA_Trabalho/blob/main/docs/adr/ADR-001-seguranca.md)
- [ADR-003](https://github.com/RottyWheels/ESA_Trabalho/blob/main/docs/adr/ADR-003-confiabilidade-transacional-pagamentos.md)
- [ADR-008](https://github.com/RottyWheels/ESA_Trabalho/blob/main/docs/adr/ADR-008-interoperabilidade.md)
- [componentes.md](https://github.com/RottyWheels/ESA_Trabalho/blob/main/docs/componentes.md)
- [tecnologias.md](https://github.com/RottyWheels/ESA_Trabalho/blob/main/docs/tecnologias.md)
- [pacotes.puml](https://github.com/RottyWheels/ESA_Trabalho/blob/main/docs/diagramas/pacotes.puml)

`tecnologias.md` de lá é proposta. Não trate linguagem nem framework como fechados até o desenvolvedor confirmar. Veja [Decisões registradas](docs/src/decisoes.md).

## Escopo

Implemente somente quando o desenvolvedor pedir, e somente estes requisitos do PDF:

| Requisito | Obrigação neste projeto |
| :--- | :--- |
| REQ 01 | Cadastrar usuário (advogado e usuário comum; empresa fica para depois, decisão D1). |
| REQ 02 | Recuperar senha. |
| REQ 03 | Entrar no sistema. |
| REQ 04 | Sair do sistema. |
| REQ 05 | Comprar créditos: escolher pacote e informar faturamento. O pedido para em `billing_recorded`. O pagamento continua no REQ 06. |

REQ 06 em diante ficam de fora até um pedido explícito. A lista de títulos está no [roteiro](docs/src/roadmap.md).

O REQ 05 descreve um fluxo que chega ao pagamento, e o PDF numera o pagamento como REQ 06. Não avance essa fronteira por conta própria. A sugestão registrada é implementar escolha de pacote e dados de faturamento, e parar antes de executar o pagamento.

## Arquitetura a seguir

Siga o estilo service-based e as camadas planejadas no repositório de referência: interface web, gateway, e um serviço por contexto, com camadas `api`, aplicação, domínio e infraestrutura. Nenhum serviço importa outro. Detalhe e o recorte para o escopo atual estão em [Mapa da arquitetura](docs/src/arquitetura.md).

Pastas e identificadores de código em inglês, correspondendo às camadas do plano. A documentação explica o vínculo com os nomes do repositório de referência.

## veridt-sketch

Use o sketch quando ele existir, para reaproveitar com cautela e gastar menos contexto. Não copie o repositório inteiro para cá.

Checkout conhecido nesta máquina: `/home/dante/Code/projects/veridt-sketch`. Em outra máquina, procure um diretório irmão `../veridt-sketch`. Se não existir, siga só o repositório de arquitetura e registre a ausência no livro.

O sketch numerou o trabalho como ADR-001, ADR-002 e ADR-003. Essa numeração não é a dos REQ do PDF. No sketch, a captura de evidências está no que ele chama de ADR-002, e isso corresponde a requisitos posteriores ao REQ 05. Não traga captura, worker, registros, evidências, Playwright nem MinIO de evidências neste escopo.

Reaproveite com leitura e adaptação, não com cópia cega:

- Identidade: cadastro, entrada, saída e recuperação de senha.
- Notificação: e-mail desses fluxos, depois que o desenvolvedor confirmar se o cadastro exige confirmação.
- Créditos: catálogo, pedido e faturamento, até a fronteira com o REQ 06.
- Gateway, pacote de autenticação e páginas web desses fluxos.

Ao adaptar, reescreva identificadores para inglês. O sketch ainda usa o nome interno `veridit` e alguns estados em português. Não propague isso sem decisão registrada.

## Idioma

- Código, identificadores, comentários, mensagens de erro de API e commits: inglês.
- `docs/` e `README.md`: português.
- Texto visível do produto (rótulos de tela): português, porque o produto é o do enunciado. Isso é premissa de trabalho. Se o desenvolvedor quiser outro idioma de interface, ele avisa.

## Interface web

- Formulários: `react-hook-form` com schema `zod` (`@hookform/resolvers/zod`). O schema fica ao lado da página (`<nome>-schema.ts`), e as mensagens de validação ficam em português.
- Estado global: `zustand`, só quando houver estado compartilhado entre telas. Não instale antes de precisar. Estado de uma tela fica local.
- Páginas em `web/src/pages/`, com `export default` na própria declaração (`export default function LoginPage()`). Componentes com export nomeado.
- Componentes seguem SRP (uma responsabilidade cada), OCP por composição no padrão do shadcn e ISP: props só com o que o componente usa, com `Pick<>` do tipo de domínio em vez do objeto inteiro. Detalhe em [SOLID](docs/src/solid.md).

## Comentários no código

Não comente o óbvio. Comente só quando a lógica não se explica pelo próprio código, por exemplo um contorno, uma regra de negócio não evidente ou uma restrição externa. Não use comentário para indicar a origem do código, como "portado do sketch", nem para repetir o que o nome ou o tipo já dizem.

## Documentação

A skill do livro está no repositório, em pasta genérica, para qualquer desenvolvedor ou agente:

`agents/skills/project-docs-book/SKILL.md`

Leia essa skill antes de criar ou editar `docs/`. Mantenha o livro enxuto. Registre decisão, método vigente, mapa e roteiro. Não duplique o PDF.

Pré-visualização: `make docs-serve` em `http://localhost:3000`.

## Decisões

Antes de uma decisão importante, pergunte ao desenvolvedor. Importante inclui: stack, fronteira de requisito, novo serviço, contrato público, persistência, autenticação, e qualquer fatiamento SOLID que mude a estrutura.

Decida você mesmo o que for trivial e local: nome de variável, ordem de um parágrafo, formatação, um teste óbvio do comportamento já decidido. Não abra questionário.

Sugestões e decisões SOLID ficam em [SOLID](docs/src/solid.md). Sugestão não é decisão. Não implemente a sugestão até o desenvolvedor escolher, quando a escolha mudar a estrutura.

Itens em aberto estão na tabela de [Decisões registradas](docs/src/decisoes.md). Não comece o código de aplicação com esses itens sem resposta.

## Agentes auxiliares

Delegue leitura, busca e resumo a subagentes. Prefira um modelo mais barato entre os disponíveis na sessão. O agente principal integra o resultado e mantém o escopo. Não delegue a decisão que precisa do desenvolvedor.
