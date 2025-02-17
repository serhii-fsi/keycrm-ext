import { useState } from "react";
import ReactDOM from "react-dom/client";

import { Api } from "../utils/Api";
import { sleep } from "../utils/sleep";
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
          parent.deleteTask();
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

  getTaskNameEl() {
    return this.dialogWrapper?.querySelector(".task--name") as HTMLSpanElement;
  }

  getLidName() {
    const el = this.dialogWrapper?.querySelector(".task--tasked>a");
    return el?.textContent?.trim();
  }

  getCopyTaskLinkButtonEl() {
    const el = this.dialogWrapper?.querySelector(
      ".task-header--right .el-button:has(.key-icon--link)"
    );
    return el;
  }

  async getTaskLink() {
    const copyButton = this.getCopyTaskLinkButtonEl() as HTMLButtonElement;
    copyButton?.click();
    await sleep(100);
    try {
      const text = await navigator.clipboard.readText();
      return { text };
    } catch (error) {
      return { error };
    }
  }

  async deleteTask() {
    this.getDialogWrapper();

    const taskLink = await this.getTaskLink();
    if (taskLink.error) {
      console.error("Failed to read clipboard:", taskLink.error);
      return;
    }
    if (taskLink.text?.indexOf("https") !== 0) {
      console.error("Wrong url format");
      return;
    }

    const taskNumber = Api.getTaskNumberFromUrl(taskLink.text);
    if (taskNumber.error) {
      console.error("Failed to read clipboard:", taskLink.error);
      return;
    }

    const res = await Api.fetch(Api.getTaskUrl(taskNumber.result), "DELETE");
    if (res.error) {
      console.error("Failed to fetch:", res.error);
      return;
    }

    this.getTaskNameEl().innerText =
      this.getTaskNameEl()?.innerText + " (DELETED)";
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
