import { ContentScriptContext } from "wxt/client";

export class Modifier {
  ctx: ContentScriptContext;
  config: any;
  target: any;
  event: string | undefined;
  observerConfig: any;
  observerCallback: Function | undefined;

  constructor(ctx: ContentScriptContext, config: any) {
    this.ctx = ctx;
    this.config = config;
  }

  on(target: any) {
    this.target = target;
    return this;
  }

  load() {
    this.event = "load";
    return this;
  }

  domLoaded() {
    this.event = "DOMContentLoaded";
    return this;
  }

  observe() {
    if (!this.config.match.test(document.location)) return this;
    this.ctx.addEventListener(this.target, this.event, () => {
      const observer = new MutationObserver((records: MutationRecord[]) => {
        for (const record of records) {
          for (const addedNode of record.addedNodes) {
            if (
              addedNode instanceof HTMLElement &&
              this.config.checkTrigger(addedNode)
            ) {
              if (this.observerCallback) this.observerCallback(addedNode);
            }
          }
        }
      });

      observer.observe(
        document.querySelector(this.config.observedNodeSelector),
        { childList: true, subtree: true }
      );
    });

    return this;
  }
}
