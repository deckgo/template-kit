# DeckDeckGo - Template Kit

Create a template for your [DeckDeckGo] presentations.

## Table of contents

- [Getting Started](#getting-started)
- [Development](#development)
    - [Naming](#naming)
    - [Author](#author)
    - [UI](#ui)
    - [Lifecycle](#lifecycle)
    - [Documentation](#documentation)
      - [Properties](#properties)
      - [Slots](#slots)
- [Usage](#usage)
- [License](#license)

## Getting Started

This kit help you create your own templates for [DeckDeckGo] slides.

To get started, either use [this template](https://github.com/deckgo/template-kit/generate) to generate a new project or, execute our Cli in your shell.

```
npm init deckdeckgo
```

## Development

The project, also sometimes referenced as "component", is developed with [Stencil](https://stenciljs.com). The template you are about to develop is nothing else than a Web Components.

### Naming

The default template's name is `my-template`. It should be renamed in your project as following:

- Define a new [tag](https://github.com/deckgo/template-kit/blob/bad5acba265288abd5827b89e3c02245afb24b00/src/components/my-template/my-template.tsx#L14) name. Note that `deckdeckgo`, `deckgo` and `ddg` are reserved keywords.

- Rename, if you wish, the related [folder](https://github.com/deckgo/template-kit/tree/master/src/components/my-template9, component and stylesheet

- Update the [namespace](https://github.com/deckgo/template-kit/blob/bad5acba265288abd5827b89e3c02245afb24b00/stencil.config.ts#L11) in the `stencil.config.ts` configuration

- Finally, change also the [name](https://github.com/deckgo/template-kit/blob/bad5acba265288abd5827b89e3c02245afb24b00/package.json#L2) in `package.json` and, `package-lock.json`

Note: we do not have yet automated yes these renaming operations in our [Cli](https://github.com/deckgo/deckdeckgo/tree/master/cli) but, we do see the advantages. If you are willing to provide a PR to implement such features, we would love to get your contribution! 

### Author

TODO

### UI

TODO

### Lifecycle

TODO

#### Documentation

TODO

##### Properties

TODO

##### Slots

TODO

## Usage

TODO

## License

MIT © [David Dal Busco](mailto:david.dalbusco@outlook.com) and [Nicolas Mattia](mailto:nicolas@nmattia.com)

[deckdeckgo]: https://deckdeckgo.com
