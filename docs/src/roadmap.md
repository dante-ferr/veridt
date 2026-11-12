# Roteiro

Trabalho ainda aberto. O comportamento que já vale está em [Fluxos](fluxos.md).

## 1. Telas do escopo

As telas existem em `web/` com serviços simulados (`web/src/services/`):

- REQ 01: cadastrar advogado e usuário comum.
- REQ 02: recuperar senha (pedir link e definir nova senha).
- REQ 03 e REQ 04: entrar e sair.
- REQ 05: comprar créditos (passo 1, pacote) e faturamento (passo 2). O pagamento (passo 3) é o REQ 06 e fica fora.

## 2. Integração da interface com o backend

Trocar os stubs pela API descrita em [Fluxos](fluxos.md) e resolver os itens em aberto de [Decisões registradas](decisoes.md): confirmação de e-mail (tela `/confirm`), histórico de compras, nome e saldo no header, e a sessão (tokens e `signOut`) numa store `zustand`.

## Fora deste roteiro

Estes títulos existem no PDF e não entram no trabalho até pedido explícito: efetuar pagamento de créditos, confirmar pagamento por e-mail, iniciar registro de conteúdo, concluir gravação, confirmar gravação por e-mail, concluir captura de tela, confirmar captura por e-mail, listar registros, ver detalhes, gerar relatório, gerar arquivo zip.
