import PouchDB from 'pouchdb';
import upsert from 'pouchdb-upsert';
PouchDB.plugin(upsert);
export default class DB {
  constructor(name) {
    this.db = new PouchDB(name);
  }

  async myDeltaFunction(doc) {
    doc.counter = doc.counter || 0;
    doc.counter++;
    //console.log(doc);
    //console.log("cooler");
    return doc;
  }

  async updateRace(raceData) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    var doc = {
      _id: today,
      raceDataField: raceData,
      counter: 0,
    }
    //console.log("updateRaceData");
    //const todayRaceData = await this.db.get(today);
    var todayRaceData = doc;
    /* try {
         todayRaceData = await this.db.get(today);
         console.log(todayRaceData);
       } catch (err) {
         if (err.name === 'not_found') {
           const todayRaceDataNew = await this.db.post(doc);
           console.log("OLÄMPLIG");
           return todayRaceDataNew;

         } else {
           throw err; // some error other than 404
         }
       }
*/
    /* this.db.upsert(today, this.myDeltaFunction(doc)).then(function () {
       // success!
     }).catch(function (err) {
       // error (not a 404 or 409)
     });
     */
    this.db.upsert(today, function (doc) {
      doc.raceDataField = raceData;
      //doc.count++;
      return doc;
    }).then(function (res) {
      // success, res is {rev: '1-xxx', updated: true, id: 'myDocId'}
      //console.log(res);
    }).catch(function (err) {
      // error
    });
    // console.log(doc);




    //console.log(todayRaceData);
    //todayRaceData.raceDataField = raceData
    //const del = await this.db.remove(todayRaceData);




    //const res = await this.db.post(raceData);

    return todayRaceData;
  }

  async getRaceDataDB() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;



    var todayRaceData = await this.db.get(today);
    //console.log("return");
    //console.log(todayRaceData.raceDataField);
    todayRaceData = todayRaceData.raceDataField;
    return todayRaceData
  }

  async setSyncSettings(settings) {

    this.db.upsert("settings", function (doc) {
      doc.syncServerSettings = settings;
      //doc.count++;
      return doc;
    }).then(function (res) {
      // success, res is {rev: '1-xxx', updated: true, id: 'myDocId'}
      console.log(res);
    }).catch(function (err) {
      // error
      console.log(error);
    });

  }
  async getCurrentRaceNrDB() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    var todayRaceData = await this.db.get(today);
    var todayCurrentRaceNr = todayRaceData.currentRaceNr;
    return todayCurrentRaceNr
  }
  async getSyncSettings() {
    var settings = await this.db.get("settings");
    //console.log("return");
    //console.log(settings.syncServerSettings);
    //syncSettings = syncSettings.settings;
    return settings.syncServerSettings

  }





}