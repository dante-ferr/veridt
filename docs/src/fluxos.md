# Fluxos

Como o backend dos REQ 01 a REQ 05 se comporta agora. O enunciado continua no PDF de referência. A compra para antes do pagamento, como registrado em [Decisões](decisoes.md).

A borda é o gateway em `http://localhost:8080`. O Vite, em `web/vite.config.ts`, encaminha `/v1` para essa porta. Erros de API usam `{ "error": "...", "message": "..." }`. Mensagens de API estão em inglês. O texto do e-mail está em português.

## Identidade

Serviço em `services/identity`. A conta guarda o perfil `lawyer` ou `common_user`. Advogado exige OAB no formato UF e número. CPF e OAB ficam cifrados. O login exige e-mail confirmado.

| Método e caminho                 | Autenticação | Efeito                                                          |
| :------------------------------- | :----------- | :-------------------------------------------------------------- |
| `POST /v1/accounts`              | pública      | Cria a conta e publica `EmailConfirmationRequested`             |
| `POST /v1/accounts/confirmation` | pública      | Confirma o e-mail com o token de uso único                      |
| `POST /v1/sessions`              | pública      | Entra, devolve o access token e grava o refresh token no cookie |
| `POST /v1/sessions/refresh`      | cookie       | Renova o access token                                           |
| `POST /v1/sessions/logout`       | cookie       | Revoga o refresh token e limpa o cookie                         |
| `POST /v1/password-recoveries`   | pública      | Publica `PasswordResetRequested` se a conta existir             |
| `POST /v1/password-resets`       | pública      | Troca a senha e revoga as sessões                               |
| `GET /v1/me`                     | Bearer       | Devolve id, nome, e-mail e perfil                               |
| `GET /v1/keys/jwks`              | pública      | Chave pública do access token                                   |

O access token dura 15 minutos e vai no corpo da resposta, como `{ accessToken, expiresAt }`. O refresh token dura 7 dias e só existe no cookie `veridt_refresh` (`HttpOnly`, `SameSite=Strict`, `Path=/v1/sessions`, `Secure` salvo com `COOKIE_SECURE=false`). Sem cookie válido, o refresh responde 401 e limpa o cookie. O logout não exige Bearer, para funcionar com o access token já vencido. O gateway repassa `Cookie` e `Set-Cookie`. Cinco senhas erradas bloqueiam a conta por 15 minutos. O token de confirmação dura 24 horas. O token de redefinição dura 30 minutos.

A notificação em `services/notification` consome a exchange `veridt.events` e envia o e-mail. Os links apontam para `PUBLIC_WEB_ORIGIN` (`http://localhost:5173` na composição local), nos caminhos `/confirm` e `/reset-password`. A interface tem as duas rotas.

## Créditos

Serviço em `services/payments`. O pedido não abre cobrança.

| Método e caminho            | Autenticação | Efeito                                                   |
| :-------------------------- | :----------- | :------------------------------------------------------- |
| `GET /v1/credit-packages`   | Bearer       | Lista os pacotes ativos                                  |
| `POST /v1/credit-orders`    | Bearer       | Grava pacote e faturamento com estado `billing_recorded` |
| `GET /v1/credit-orders`     | Bearer       | Lista os pedidos da conta                                |
| `GET /v1/credit-orders/:id` | Bearer       | Lê um pedido da conta                                    |

O corpo de `POST /v1/credit-orders` leva `packageId` e `billing` (`fullName`, `email`, `phone`, `cpf`, `postalCode`, `street`, `number`, `complement`, `district`, `city`, `state`). Não há campo de meio de pagamento.

Pacotes iniciais, gravados na subida do serviço:

| Código     | Nome    | Créditos | Centavos por crédito | Total em centavos |
| :--------- | :------ | :------- | :------------------- | :---------------- |
| `basic`    | Básico  | 10       | 500                  | 5000              |
| `standard` | Médio   | 30       | 400                  | 12000             |
| `premium`  | Premium | 100      | 300                  | 30000             |

## O que este recorte não faz

Não há saldo, reserva de crédito, webhook, PIX nem checkout. O gateway responde 404 para esses caminhos. Captura, registros e relatório não têm serviço neste repositório.
