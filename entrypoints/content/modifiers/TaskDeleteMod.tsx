import ReactDOM from "react-dom/client";
import { useState } from "react";

import { Modifier } from "./Modifier";

import "./TaskDeleteMod.css";

export class TaskDeleteMod extends Modifier {
  execute() {
    this.observerCallback = this.add;
  }

  checkIsTaskInDom() {
    return Boolean(
      document.querySelector(
        ".el-dialog__wrapper:has(.task-wrapper):has(.task--name):has(.task--tasked>a)"
      )
    );
  }

  checkIsTaskOpened() {
    const dialogWrapper: HTMLElement | null = document.querySelector(
      ".el-dialog__wrapper:has(.task-wrapper):has(.task--name):has(.task--tasked>a)"
    );
    return dialogWrapper?.style.display !== "none";
  }

  checkIsButtonAdded() {
    return false;
  }

  getTaskName() {
    const el = document
      .querySelector(
        ".el-dialog__wrapper:has(.task-wrapper):has(.task--name):has(.task--tasked>a)"
      )
      ?.querySelector(".task--name");
    return el?.textContent?.trim();
  }

  getPipelineName() {
    const el = document
      .querySelector(
        ".el-dialog__wrapper:has(.task-wrapper):has(.task--name):has(.task--tasked>a)"
      )
      ?.querySelector(".task--tasked>a");
    return el?.textContent?.trim();
  }

  add() {
    if (!this.checkIsTaskInDom()) return;
    if (!this.checkIsTaskOpened()) return;
    if (this.checkIsButtonAdded()) return;

    console.log("Do JOB!");
    console.log(this.getTaskName());
    console.log(this.getPipelineName());
  }
}

// function App() {
//   const [count, setCount] = useState(0);

//   const ui = createIntegratedUi(ctx, {
//     position: "inline",
//     anchor: "body",
//     onMount: (container) => {
//       // Create a root on the UI container and render a component
//       const root = ReactDOM.createRoot(container);
//       renderApp(root);
//       return root;
//     },
//     onRemove: (root) => {
//       // Unmount the root when the UI is removed
//       root?.unmount();
//     },
//   });
//   // Call mount to add the UI to the DOM
//   ui.mount();

//   return (
//     <>
//       <h1>WXT + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the WXT and React logos to learn more
//       </p>
//     </>
//   );
// }

// function renderApp(root: ReactDOM.Root) {
//   root.render(<App />);
// }
