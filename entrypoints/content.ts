import { config, configTaskDeleteMod } from "./content/config";
import { TaskDeleteMod } from "./content/modifiers/TaskDeleteMod";

export default defineContentScript({
  matches: config.globalMatches,

  main(ctx) {
    const taskDeleteMod = new TaskDeleteMod(ctx, configTaskDeleteMod);
    taskDeleteMod.on(window).load().observe().execute();
  },
});
