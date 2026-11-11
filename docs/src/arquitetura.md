# Mapa da arquitetura

Mapa do que o código deve obedecer quando a implementação for pedida. Ainda não há pastas de aplicação. A autoridade do desenho é o repositório [ESA_Trabalho](https://github.com/RottyWheels/ESA_Trabalho.git), em especial a ADR-011, a ADR-009 e `docs/diagramas/pacotes.puml`.

## Estilo

Seis serviços de domínio no plano completo, com gateway, PostgreSQL (schema e usuário por serviço), fila e armazenamento de objetos. Cada serviço se implanta à parte. Nenhum serviço importa o código de outro. Integração por API ou por evento.

Dentro de cada serviço, a dependência aponta para o domínio:

| Pasta neste repositório | Nome no plano de referência | Função |
| :--- | :--- | :--- |
| `api` | `api` | Controladores, validação, contrato HTTP |
| `application` | `aplicacao` | Casos de uso |
| `domain` | `dominio` | Entidades, regras e portas |
| `infrastructure` | `infraestrutura` | Banco, fila e adaptadores |

## Recorte deste projeto

Quando a implementação começar, o mono-repo deve ter só o necessário aos REQ 01 a 05:

| Pasta prevista | Contexto de referência | Requisitos |
| :--- | :--- | :--- |
| `web` | Interface web | Telas do escopo |
| `gateway` | API Gateway | Borda autenticada |
| `services/identity` | Identidade | REQ 01 a REQ 04 |
| `services/notification` | Notificação | E-mail de recuperação e, se confirmado, de cadastro |
| `services/payments` | Créditos e pagamentos | REQ 05, até a fronteira registrada em [Decisões](decisoes.md) |

Captura, registros e relatórios existem no plano completo e ficam sem pasta aqui até o desenvolvedor pedir o requisito correspondente.

## O que dá para executar hoje

1. `make docs-serve` publica este livro em `http://localhost:3000`.

Não há site, API nem composição de contêineres.

## Uso do veridt-sketch

Checkout conhecido: `/home/dante/Code/projects/veridt-sketch`. Não entre como submódulo nem como cópia de árvore.

| No sketch | Uso aqui |
| :--- | :--- |
| `services/identity` | Base cautelosa dos REQ 01 a 04 |
| `services/notification` | E-mail dos fluxos de identidade |
| `services/payments` | Catálogo, pedido e faturamento, sem avançar o pagamento se a fronteira continuar a sugestão atual |
| `gateway`, `packages/auth`, páginas de conta e créditos em `web` | Borda e interface desses fluxos |
| `services/capture`, `services/capture-worker`, `services/records`, `packages/evidence` | Fora do escopo. Não trazer. |

O sketch chama de ADR-002 a captura de evidências. No PDF, isso está depois do REQ 05. Trate o sketch como código de referência, não como mapa de requisitos.
