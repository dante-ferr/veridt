.PHONY: docs-serve

docs-serve:
	@which mdbook > /dev/null || (echo "O mdBook não está instalado. Instale em https://github.com/rust-lang/mdBook/releases ou com cargo install mdbook" && exit 1)
	@echo "Livro em http://localhost:3000"
	mdbook serve docs
