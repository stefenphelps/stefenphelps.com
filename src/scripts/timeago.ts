import { format } from "timeago.js";

const w = window as Window & { __timeagoInitialized?: boolean };
if (!w.__timeagoInitialized) {
  w.__timeagoInitialized = true;

  const targets = Array.from(document.querySelectorAll("[data-timeago]"));
  if (targets.length) {
    const updateTimeago = () => {
      for (const el of targets) {
        const datetime = el.getAttribute("data-timeago-datetime");
        if (!datetime) continue;
        el.textContent = format(datetime, "en_US");
      }
    };

    updateTimeago();
    setInterval(updateTimeago, 60 * 1000);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) updateTimeago();
    });
  }
}
