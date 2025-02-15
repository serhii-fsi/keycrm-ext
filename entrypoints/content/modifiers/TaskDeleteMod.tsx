import { useState } from "react";
import ReactDOM from "react-dom/client";

import { Modifier } from "./Modifier";

import "./TaskDeleteMod.css";

function Component({ parent }: { parent: any }) {
  const [isDelete, setIsDelete] = useState(false);

  return isDelete ? (
    <>
      <button
        className="TaskDeleteMod_Button"
        onClick={() => {
          setIsDelete(false);
          parent.query();
        }}
      >
        Yes
      </button>
      <button
        className="TaskDeleteMod_Button"
        onClick={() => {
          setIsDelete(false);
        }}
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      className="TaskDeleteMod_Button"
      onClick={() => {
        setIsDelete(true);
      }}
    >
      Delete
    </button>
  );
}

export class TaskDeleteMod extends Modifier {
  dialogWrapper: HTMLElement | null | undefined;
  actionsWrapper: HTMLElement | null | undefined;

  execute() {
    this.observerCallback = this.add;
  }

  getDialogWrapper() {
    this.dialogWrapper = document.querySelector(
      ".el-dialog__wrapper:has(.task-wrapper):has(.task--name):has(.task--tasked>a)"
    ) as HTMLElement;
  }

  getActionsWrapper() {
    this.actionsWrapper = this.dialogWrapper?.querySelector(
      ".task-footer>.actions"
    );
  }

  checkIsTaskInDom() {
    return Boolean(this.dialogWrapper);
  }

  checkIsTaskOpened() {
    return this.dialogWrapper?.style.display !== "none";
  }

  checkIsButtonAdded() {
    return Boolean(this.dialogWrapper?.querySelector(".TaskDeleteMod_Button"));
  }

  getTaskName() {
    const el = this.dialogWrapper?.querySelector(".task--name");
    return el?.textContent?.trim();
  }

  getPipelineName() {
    const el = this.dialogWrapper?.querySelector(".task--tasked>a");
    return el?.textContent?.trim();
  }

  query() {
    this.getDialogWrapper();
    console.log("Do Query!");
    console.log(this.getTaskName());
    console.log(this.getPipelineName());
  }

  addButton() {
    const ui = createIntegratedUi(this.ctx, {
      position: "inline",
      anchor: this.actionsWrapper,
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(<Component parent={this} />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });
    ui.mount();
  }

  add() {
    this.getDialogWrapper();
    if (!this.checkIsTaskInDom()) return;
    if (!this.checkIsTaskOpened()) return;
    if (this.checkIsButtonAdded()) return;
    this.getActionsWrapper();
    this.addButton();
  }
}
