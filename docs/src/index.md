# Veridt

Livro de método do Veridt. Descreve o que já foi decidido, a arquitetura, o comportamento do backend e o trabalho ainda aberto. O enunciado do produto permanece no repositório de arquitetura. Este livro não o reproduz.

O plano de trabalho dos agentes está em `AGENTS.md`, na raiz do repositório.

## Como ler

| Capítulo | O que explica |
| :--- | :--- |
| [Decisões registradas](decisoes.md) | O que já vale e o que ainda precisa do desenvolvedor |
| [Mapa da arquitetura](arquitetura.md) | Onde o código mora e o que foi reaproveitado do sketch |
| [Fluxos](fluxos.md) | Contrato HTTP de identidade e de compra até o faturamento |
| [SOLID](solid.md) | Sugestões e a estrutura adotada no backend |
| [Roteiro](roadmap.md) | Trabalho aberto: as telas que ainda faltam |

Pré-visualização local:

```bash
make docs-serve
```

Abre em `http://localhost:3000`. O livro é local. Não há publicação automática.
