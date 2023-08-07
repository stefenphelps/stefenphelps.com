import { registerSW } from "virtual:pwa-register";
import Snackbar from "node-snackbar";

// pwa stuff
if ("serviceWorker" in navigator) {
  const updateSW = registerSW({
    onNeedRefresh() {
      Snackbar.show({
        text: "Update available.",
        actionText: "Update",
        actionTextColor: "#fff",
        onActionClick: updateSW(true),
      });
    },
    onOfflineReady() {
      Snackbar.show({
        actionTextColor: "#fff",
        text: "Offline ready.",
      });
    },
  });

  window.addEventListener("offline", () => {
    Snackbar.show({
      actionTextColor: "#fff",
      text: "You are offline—some things may not work.",
    });
  });

  window.addEventListener("online", () => {
    Snackbar.show({
      actionTextColor: "#fff",
      text: "You're back online, proceed as usual 😀",
    });
  });
}
