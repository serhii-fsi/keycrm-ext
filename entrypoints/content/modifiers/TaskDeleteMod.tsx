import ReactDOM from "react-dom/client";
import { useState } from "react";

import { Modifier } from "./Modifier";

import "./TaskDeleteMod.css";

export class TaskDeleteMod extends Modifier {
  execute() {
    this.observerCallback = this.add;
  }

  add() {
    console.log("Do JOB!");
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
