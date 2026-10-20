# Contributing

Thanks for taking the time to contribute. This repository hosts 14 independent
projects, so most changes only affect one folder.

## Ground rules

1. **One project per pull request.** Keep the scope small and reviewable.
2. **Match the existing style.** Two-space indent in web projects, four-space in
   Java and Python (see `.editorconfig`).
3. **Keep code, identifiers and comments in English.** User-facing copy and
   documentation may be Spanish or English.
4. **Never commit secrets.** Database credentials, API keys and `.env` files
   stay out of git.
5. **Quality gates must pass.** `npm run lint` and `npm test` for web projects,
   `python -m unittest discover -s tests` for Python.

## Local setup

```bash
# Web projects
cd 01-agency-next
npm install
npm run dev

# Python
cd 14-python-logistics
python main.py

# Java
cd 13-java-biblioteca
mkdir out && javac -d out -encoding UTF-8 src/*.java && java -cp out Main
```

## Commit convention

Use [Conventional Commits](https://www.conventionalcommits.org):

```text
feat: add pricing comparison table
fix: prevent double submit on reservation form
docs: translate README to English
chore: bump tailwind to 3.4.4
```

## Pull request checklist

- [ ] The change is scoped to a single project
- [ ] `npm run lint` and `npm test` pass (or the equivalent for Java/Python)
- [ ] README updated if behaviour or setup changed
- [ ] New UI states were checked in both ES and EN

## Reporting bugs

Open an issue with the project name, the steps to reproduce, expected vs. actual
behaviour, and the browser/runtime version.

## License

By contributing you agree that your work is licensed under the [MIT License](../LICENSE).
