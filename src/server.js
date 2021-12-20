const
    {Server} = require("socket.io"),
    server = new Server(1337),
    { ipcMain } = require('electron');

let
    sequenceNumberByClient = new Map();

// event fired every time a new client connects:
console.log("Server started!")
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});

// sends each client its current sequence number
/*
setInterval(() => {
    for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        client.emit("seq-num", sequenceNumber);
        sequenceNumberByClient.set(client, sequenceNumber + 1);
    }
}, 1000);
*/
function getCurrentRaceDataFromClient(raceNr){
    for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        client.emit("requestRaceDataNr", raceNr);
    }
    return 0
};

ipcMain.on("notify", (_, message) => {
    console.log("notify" + message)
 });
 ipcMain.on("getCurrentRaceData", (_, message) => {
    console.log("getCurrentRaceData" + message)
    getCurrentRaceDataFromClient(parseInt(message))
 });