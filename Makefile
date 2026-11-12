.PHONY: help docs-serve test up down logs web-dev

help:
	@echo "up          Sobe a stack (docker compose up --build)"
	@echo "down        Para a stack (docker compose down)"
	@echo "logs        Acompanha os logs do Compose"
	@echo "web-dev     Vite em http://localhost:5173 (a stack precisa estar no ar)"
	@echo "test        Roda npm test"
	@echo "docs-serve  Livro em http://localhost:3000"

docs-serve:
	@which mdbook > /dev/null || (echo "O mdBook não está instalado. Instale em https://github.com/rust-lang/mdBook/releases ou com cargo install mdbook" && exit 1)
	@echo "Livro em http://localhost:3000"
	mdbook serve docs

test:
	npm test

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

web-dev:
	npm run dev -w web
