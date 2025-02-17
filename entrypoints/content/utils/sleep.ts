export async function sleep(ms: number) {
  await new Promise((resolve: (value: unknown) => void) => {
    window.setTimeout(() => {
      resolve(true);
    }, ms);
  });
}
