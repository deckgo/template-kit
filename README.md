# DeckDeckGo - Template Kit

Create a template for your [DeckDeckGo] presentations.

## Table of contents

- [Getting Started](#getting-started)
- [Development](#development)
    - [Naming](#naming)
    - [Author](#author)
    - [Rendering](#rendering)
    - [Styling](#styling)  
    - [Lifecycle](#lifecycle)
    - [Documentation](#documentation)
      - [Slots](#slots)
      - [Properties](#properties)
- [Usage](#usage)
  - [Online editor](#online-editor)
  - [Starter kit](#starter-kit)
- [License](#license)

## Getting Started

This kit helps you create your own templates for [DeckDeckGo] slides.

To get started, either use [this template](https://github.com/deckgo/template-kit/generate) to generate a new project or, execute our [cli] in your shell.

```
npm init deckdeckgo
```

## Development

The project is developed with [Stencil](https://stenciljs.com). The template you are about to develop is nothing else than a Web Components.

To run a local server and, test your template in your favorite browser, execute the following command in the template's root folder:

```
npm run start
```

### Naming

The default template's name is `my-template`. It should be renamed in your project as following:

- Define a new [tag](https://github.com/deckgo/template-kit/blob/bad5acba265288abd5827b89e3c02245afb24b00/src/components/my-template/my-template.tsx#L14) name. Note that `deckdeckgo`, `deckgo` and `ddg` are reserved keywords.

- Rename, if you wish, the related [folder](https://github.com/deckgo/template-kit/tree/master/src/components/my-template9), component and stylesheet

- Update the [namespace](https://github.com/deckgo/template-kit/blob/bad5acba265288abd5827b89e3c02245afb24b00/stencil.config.ts#L11) in the `stencil.config.ts` configuration

- Finally, change also the [name](https://github.com/deckgo/template-kit/blob/bad5acba265288abd5827b89e3c02245afb24b00/package.json#L2) in `package.json` and, `package-lock.json`

Note: we do not have yet automated yes these renaming operations in our [cli] but, we do see the advantages. If you are willing to provide a PR to implement such features, we would love to get your contribution! 

### Author

It is recommended to update the [author](https://github.com/deckgo/template-kit/blob/master/package.json#L42) in `package.json`. Provide a `name` and, `url`. If you share your template with the community, we will use these information to give you credits in our online editor. 

You can also update the license in its related [file](https://github.com/deckgo/template-kit/blob/master/LICENSE) and this README. Note that currently, we only consider MIT templates to be shared with the community within our online editor.

Note: again, we do not have automated this in our [cli]. Contributions are welcomed.

### Rendering

Templates are rendered using JSX. If you are new to such declarative template syntax, you can have a look to the [introduction](https://stenciljs.com/docs/templating-jsx) provided by Stencil.

To implement your custom template, its UI, you can modify the `render()` function of the component. You can replace part or, all the provided code but, it is important to not remove the class `deckgo-slide-container` added to the `host` element.

If you want users to be able to edit the content of their slides when using your template, you should add some `slot`. You can skip these or, add as many slots as it fits your use case.

As example, the component contains per default two slots `title` and `content`. These are going to be made editable in our online editor. If the template would be used in HTML, it would be use as following:

```
<deckgo-deck>
  <my-template>
    <h1 slot="title">My user edited title</h1>
    <p slot="content">My user edited content</p>
  </my-template>
</deckgo-deck>
```

The default template also provides some slots which are used by the core of [DeckDeckGo] (`notes`, `background`, etc.). It is recommended to use these but, as described in the code, you can remove some if you rather like.

### Styling

Styling can be made with SCSS. It inherits two styles:

- [deckdeckgo-slide.scss](https://github.com/deckgo/deckdeckgo/blob/master/utils/slide/styles/deckdeckgo-slide.scss) - Default spacing and positioning. You can override any properties or remove the import.
- [deckdeckgo-slide-slots.scss](https://github.com/deckgo/deckdeckgo/blob/master/utils/slide/styles/deckdeckgo-slide-slots.scss) - The style of the default slots used by our core. It is recommended to stick to it as long as you do not remove these.

### Lifecycle

In addition to Stencil [lifecycle](https://stenciljs.com/docs/component-lifecycle), [DeckDeckGo] provides a variety of lifecycles related of the behavior of the presentation.

These lifecycles have to be implemented. If you don't wish to perform any particular operation, stick to the default values.

- `componentDidLoad`

It triggers the event `this.slideDidLoad.emit();` to inform the core that the slide has been loaded / added. **Do not remove** this.

- `beforeSwipe`

Called before the swipe to next slide is happening. By returning `false`, it tells the core to not switch to next slide. If for example you want to animate elements upon arrow keys, it should not return `true` until you have animated everything.

`enter` tells you about the direction. The name as the `boolean` is not the best, I agree. I am open to suggestion. Note that we support `RTL`.

`reveal` is a flag in case the users as defined some of the elements added to the slide has to be revealed progressively.

- `afterSwipe`

Is triggered after the next slide is displayed.

- `lazyLoadContent`

A method which is called to trigger the lazy loading of its elements. For example, let's say you have four slides and, an image on the fourth slide. On load, the image won't be fetched for performance reason but, will automatically be loaded when you reach the third slides.

Loading happens on slide number - 1 or + 1 (according the direction) except if you jump to a specific slide number. Then, its images and, these of previous and next slides are loaded.

With such strategy, it ensures both loading performance and UI performance.

- `showAllRevealElements` and `hideAllRevealElements`

These are used to animate the elements which have been defined by the users are having to be "revealed". It is recommended to stick to it.

#### Documentation

This chapter does not matter much if you "only" plan to use your template with our starter kit but, is really important if you plan to use it in our online editor.

In addition to the build itself, a `src/components.desc.json` file is going to be automatically generated based on the documentation added to your template's code.

This file describes the `properties` and `slots` of your template. Using these, our editor will then be able to present the appropriate options to the users.

##### Slots

Each `slot` which can be edited by the users should be documented. It contains the `name` (if apply) and a `description`.

```
/**
 * @slot title - An example of a custom slot
 */
```

In addition, it is also possible to restrict the usage of the `slot` to certain types of elements (comma separated list).

```
/**
 * @slot content - Another example of a custom slot with a restricted list of usage - h1,h2,h3,section
 */
```

These elements are:

- `h1`
- `h2`
- `h3`
- `section`
- `ol`
- `ul`
- `deckgo-lazy-img` - The [DeckDeckGo] component for images which ensure lazy loading
- `deckgo-highlight-code` - Block of code
- `deckgo-markdown`  - Markdown
- `deckgo-math` - Math formula
- `deckgo-word-cloud` - Word of cloud

##### Properties

In addition to the documentation, it is worth to notice that properties should be reflected to attributes.

Example:

```
/**
 * An example of a custom property
 */
@Prop({reflect: true})
value: string;
```

Note also that if your properties have effect on the UI and, need re-rendering, it is worth to also add [@Watch](https://stenciljs.com/docs/reactive-data) decorator to react on dynamic changes, such as these performed by the user in our editor.

## Usage

The templates you create are compatible with both our online editor and, starter kit. 

### Online editor

To use your template in our online editor, it has to be made available through a CDN. We support [Unpkg](https://unpkg.com/), [Cloudfare](https://www.cloudflare.com/cdn) and [jsDelivr](https://www.jsdelivr.com/). If you would like to use another one, [get in touch](https://deckdeckgo.com/en/contact).

Once published, you can add it to your collection of [templates](https://deckdeckgo.com/templates) with the CDN url, its tag name and, the automatically generated description file `src/components.desc.json`.

### Starter kit

If you are looking to use your template with our starter kit, you can import it through the `/dist/loader` once you have added it as a dependency of your project.

## License

MIT © [David Dal Busco](mailto:david.dalbusco@outlook.com) and [Nicolas Mattia](mailto:nicolas@nmattia.com)

[deckdeckgo]: https://deckdeckgo.com
[cli]: https://github.com/deckgo/deckdeckgo/tree/master/cli