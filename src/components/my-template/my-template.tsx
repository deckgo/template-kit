import {Component, Element, Event, EventEmitter, Method, h, Host, Fragment, Prop} from '@stencil/core';

import {
  DeckdeckgoSlide,
  hideLazyLoadImages,
  afterSwipe,
  beforeSwipe,
  lazyLoadContent,
  hideAllRevealElements,
  showAllRevealElements,
} from '@deckdeckgo/slide-utils';

/**
 * @slot title - An example of a custom slot
 * @slot content - Another example of a custom slot with a restricted list of usage - h1,h2,h3,section
 */
@Component({
  tag: 'my-template',
  styleUrl: 'my-template.scss',
  shadow: true,
})
export class MyTemplate implements DeckdeckgoSlide {
  @Element() private el: HTMLElement;

  @Event() private slideDidLoad: EventEmitter<void>;

  /**
   * An example of a custom property
   */
  @Prop({reflect: true})
  value: string;

  async componentDidLoad() {
    await hideLazyLoadImages(this.el);

    this.slideDidLoad.emit();
  }

  @Method()
  beforeSwipe(enter: boolean, reveal: boolean): Promise<boolean> {
    return beforeSwipe(this.el, enter, reveal);
  }

  @Method()
  afterSwipe(): Promise<void> {
    return afterSwipe();
  }

  @Method()
  lazyLoadContent(): Promise<void> {
    return lazyLoadContent(this.el);
  }

  @Method()
  revealContent(): Promise<void> {
    return showAllRevealElements(this.el);
  }

  @Method()
  hideContent(): Promise<void> {
    return hideAllRevealElements(this.el);
  }

  render() {
    return (
      <Host class={{'deckgo-slide-container': true}}>
        <div class="deckgo-slide">
          <slot name="title"></slot>
          <slot name="content"></slot>
          <p>An example of property: {this.value}</p>

          {this.renderDeckSlots()}
        </div>
      </Host>
    );
  }

  /**
   * Slots used to propagate decks options.
   *
   * - notes: allow user to add notes for this slide (mandatory)
   * - header: clone a header on every slides (recommended)
   * - footer: clone a footer on every slides (recommended)
   * - background: replicate the same background on every slides (recommended if you do not provide any particular design)
   * - actions: can be use to add an action on the top right corner of a slide (optional)
   */
  private renderDeckSlots() {
    return <Fragment>
      <slot name="notes"></slot>
      <slot name="header"></slot>
      <slot name="footer"></slot>
      <slot name="background"></slot>
      <slot name="actions"></slot>
    </Fragment>
  }
}
