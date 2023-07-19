# Nx Todo

[![Build](https://github.com/roalcantara/nxtodo/actions/workflows/build.yml/badge.svg)]

Yet Another Todo App

[![MIT license](https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg?style=flat-square)][2]
[![Standard Readme](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)][5]
[![Editor Config](https://img.shields.io/badge/Editor%20Config-1.0.1-crimson.svg?style=flat-square)][4]
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)][3]
[![eslint](https://img.shields.io/badge/code%20style-eslint-green.svg?style=flat-square)][10]

## Install

`git clone https://github.com/roalcantara/nxtodo`

### Dependencies

- [git][6]
- [gitlint][7]
- [pre-commit][8]

## Usage

```sh
# run eslint
npx nx lint tasks

# run jest tests
npx nx test tasks

# run cypress tests
npx nx e2e tasks-e2e

# build the application to `dist/` directory
npx nx build tasks

# start the development server at http://localhost:4200
npx nx serve tasks
```

## Acknowledgements

- [Standard Readme][5]
- [Conventional Commits][3]
- [Nx, a Smart, fast and extensible build system][9]

## Contributing

- Bug reports and pull requests are welcome on [GitHub][0]
- Do follow [Editor Config][4] rules
- Do follow [Git lint][8] rules
- Everyone interacting in the project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [Contributor Covenant][2] code of conduct

## License

The project is available as open source under the terms of the [MIT][1] [License](LICENSE)

[0]: https://github.com/roalcantara/nxtodo 'Nx Todo'
[1]: https://opensource.org/licenses/MIT 'Open Source Initiative'
[2]: https://contributor-covenant.org 'A Code of Conduct for Open Source Communities'
[3]: https://conventionalcommits.org 'Conventional Commits'
[4]: https://editorconfig.org 'EditorConfig'
[5]: https://github.com/RichardLitt/standard-readme 'Standard Readme'
[6]: https://git-scm.com 'Git'
[7]: https://jorisroovers.com/gitlint 'git commit message linter'
[8]: https://pre-commit.com 'A framework for managing and maintaining multi-language pre-commit hooks'
[9]: https://nx.dev 'Nx, a Smart, fast and extensible build system'
[10]: https://eslint.org 'ESLint'
