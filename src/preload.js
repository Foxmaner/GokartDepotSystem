import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  raceDataApi: {
    getCurrentRaceData(raceNr) {
      ipcRenderer.send("getCurrentRaceData", raceNr);
    }
  },
});