if ("serviceWorker" in navigator) {
  const basePath = process.env.PUBLIC_PATH;
  const swPath = `${basePath}service-worker.js`;
  console.log("swPath", swPath);
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(swPath)
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
