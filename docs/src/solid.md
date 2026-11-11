# SOLID

O código deve seguir SOLID. Este capítulo separa sugestão de decisão. Sugestão não autoriza a abstração. Quando a alternativa mudar módulos, portas ou hierarquia, o desenvolvedor escolhe e a escolha entra na seção de decisões.

Não há código ainda. Nenhuma decisão de implementação SOLID foi tomada.

## Sugestões

Registradas em 2026-11-11. São o ponto de partida da conversa, não a estrutura obrigatória além das camadas já exigidas pela arquitetura.

| Princípio | Sugestão | Por que perguntar |
| :--- | :--- | :--- |
| Responsabilidade única | Um caso de uso por tipo: cadastrar, entrar, sair, recuperar senha, comprar créditos. | O limite de cada tipo muda arquivos e testes. |
| Aberto/fechado | Tratar advogado e usuário comum como variação explícita, para a empresa (decisão D1) entrar depois sem reescrever o cadastro. | É uma hierarquia ou uma estratégia. Dá para começar com um campo de perfil e extrair a variação só quando o segundo comportamento divergir. |
| Substituição | Qualquer perfil autenticável entra e sai pelo mesmo contrato de sessão. | Vale a pena só se a variação de perfil existir como tipos separados. |
| Segregação de interface | Portas separadas para conta, sessão e envio de e-mail. | Três portas pequenas versus uma porta de infraestrutura. |
| Inversão de dependência | Domínio sem framework. Prisma, NestJS e o cliente de e-mail ficam na infraestrutura. | A arquitetura de referência já pede isso. A forma da porta (uma ou várias) é a parte a confirmar. |

## O que não vira pergunta

Nome de função, arquivo de teste espelhando um caso de uso já aceito, e a direção das dependências entre as quatro camadas. Essa direção já está decidida pelo plano de arquitetura.

## Decisões

Nenhuma ainda.
