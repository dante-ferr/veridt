# Roteiro

Trabalho ainda aberto. O comportamento que já vale está em [Fluxos](fluxos.md).

## 1. Telas do escopo

As telas existem em `web/` e estão integradas à API descrita em [Fluxos](fluxos.md):

- REQ 01: cadastrar advogado e usuário comum, com confirmação de e-mail (`/confirm`).
- REQ 02: recuperar senha (pedir link e definir nova senha).
- REQ 03 e REQ 04: entrar e sair, com a sessão restaurada pelo cookie ao recarregar a página.
- REQ 05: comprar créditos (passo 1, pacote) e faturamento (passo 2), com o pedido gravado como `billing_recorded` e listado no histórico. O pagamento (passo 3) é o REQ 06 e fica fora.

## 2. Pendências

- Saldo de créditos real, junto com o pagamento (REQ 06).
- Testes automatizados da interface.

## Fora deste roteiro

Estes títulos existem no PDF e não entram no trabalho até pedido explícito: efetuar pagamento de créditos, confirmar pagamento por e-mail, iniciar registro de conteúdo, concluir gravação, confirmar gravação por e-mail, concluir captura de tela, confirmar captura por e-mail, listar registros, ver detalhes, gerar relatório, gerar arquivo zip.
