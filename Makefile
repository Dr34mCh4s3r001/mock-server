.PHONY: format format-check

format:
	npx prettier --write .

format-check:
	npx prettier --check . || (echo "❌ Code not formatted! Run 'make format'" && exit 1)