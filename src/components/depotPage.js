import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { internalIpV6, internalIpV4 } from 'internal-ip';
import StopWatch from './stopwatch';
import SettingsSlide from './settings';
import Alert from 'react-bootstrap/Alert';

import PouchDB from 'pouchdb';
import upsert from 'pouchdb-upsert';
PouchDB.plugin(upsert);

import DB from './db.js'


class DepotPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      settings:"",
      settingsDB: new DB("depotSettingsDB"),
      remoteDB: new DB('http://localhost:5984/myremotedb'),
      useKeyboard: false,
      localIp: "N/A",
      isValid: true,
      syncErrorMessage: "",
      activeRace: 0,
      raceData: { "largeKart": "⌛", "smallKart": "⌛", "doubleKart": "⌛" },
      statsData: { "nextRace": "⌛", "nrOfRaceQueue": "⌛", "queueTime": "⌛" },
      ioStats: { "timeSinceDbConnection": 0, "timeSinceButtonPress": 0 },
    };

    this.keyEventFunction = this.keyEventFunction.bind(this);
  };

  async fetchFromDB(){
    console.log("Fetchar från databasen")
    var allRaceData;
    try {
      allRaceData = await this.state.remoteDB.getRaceDataDB();
      this.updateRaceData(allRaceData, this.state.activeRace);
      console.log(allRaceData)
      this.setState({
        isValid: true,
        syncErrorMessage: ""
      })
    } catch (errorMessage) {
      console.log(errorMessage);
      var errorType = errorMessage["error"]
      var errorReason = errorMessage["reason"]
      this.setState({
        isValid: false,
        syncErrorMessage: "ErrorType:" + errorType + " --- ErrorReason: " + errorReason
      })
    }
  }
  async componentDidMount() {
    const self = this;
    var cooler = await self.state.settingsDB.getSyncSettings();
    self.setState({ settings: cooler })
    await self.setState({ remoteDB: new DB("http://" + cooler.formServerAdress + ":" + cooler.formServerPort + "/" + cooler.formDbName) })
    document.addEventListener("keydown", this.keyEventFunction, false);
    const ip = await internalIpV4()
    console.log(ip)
    this.setState({
      localIp: ip
    })
    await this.fetchFromDB();
    setInterval(() => this.fetchFromDB(), 6000);
    console.log(this.state.remoteDB)
    var changes = this.state.remoteDB.db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', async function (change) {
      // handle change
      var allRaceData = await self.state.remoteDB.getRaceDataDB();
      var fetchedCurrentRaceNr = await self.state.remoteDB.getCurrentRaceNrDB();
      self.setState({ activeRace: fetchedCurrentRaceNr })
      self.updateRaceData(allRaceData, self.state.activeRace);
    }).on('complete', function (info) {
      // changes() was canceled
    }).on('error', function (errorMessage) {
      var errorType = errorMessage["error"]
      var errorReason = errorMessage["reason"]
      self.setState({
        isValid: false,
        syncErrorMessage: "ErrorType:" + errorType + " --- ErrorReason: " + errorReason
      })
    });
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyEventFunction, false);
  };

  updateRaceData(raceData, activeRace) {
    if (activeRace == raceData.length) {
      this.setState({
        raceData: { "largeKart": "⌛", "smallKart": "⌛", "doubleKart": "⌛" }
      })
    }
    else {
      this.setState({
        raceData: { "largeKart": raceData[activeRace]["largeKart"], "smallKart": raceData[activeRace]["smallKart"], "doubleKart": raceData[activeRace]["doubleKart"] }
      })
    }
    this.setState({
      statsData: { "nextRace": activeRace + 1, "nrOfRaceQueue": raceData.length - activeRace, "queueTime": (raceData.length - activeRace) * 8 },
    })

  }

  async keyEventFunction(event) {
    if (!this.state.useKeyboard) { return }
    var allRaceData = await this.state.remoteDB.getRaceDataDB();

    if (event.keyCode === 39) {
      if (this.state.activeRace < allRaceData.length) {
        this.setState({
          activeRace: (this.state.activeRace + 1)
        })
      }
    } else if (event.keyCode === 37) {
      if (this.state.activeRace > 0) {
        this.setState({
          activeRace: (this.state.activeRace - 1)
        })
      }
    }
    this.updateRaceData(allRaceData, this.state.activeRace);
  };



  render() {


    return (
      <Container className="app bg-light shadow-5-strong" >
        <Row className="justify-content-md-center">
          {this.state.isValid
            ? <Alert className="text-center" variant="success">Har kontakt med databasen</Alert>
            : <Alert className="text-center" variant="danger">Något har gått knas med kopplingen till databasen <br></br>
              Error -- {this.state.syncErrorMessage}</Alert>
          }
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" id="largeKartOutput" style={{ fontSize: "7vh" }}>Depå</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" id="largeKartOutput" style={{ fontSize: "7vh" }}>Nästa Race: {this.state.activeRace + 1}</Col>
          <Col className="text-center" id="largeKartOutput" style={{ fontSize: "7vh" }}>Stora: {this.state.raceData.largeKart}</Col>
        </Row>
        <Row className="justify-content-md-center" >
          <Col className="d-grid" md="8" style={{ height: "10vh" }}>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" id="smallKartOutput" style={{ fontSize: "7vh" }}>Race kvar: {this.state.statsData.nrOfRaceQueue}</Col>
          <Col className="text-center" id="doubleKartOutput" style={{ fontSize: "7vh" }}>Små: {this.state.raceData.smallKart}</Col>
        </Row>
        <Row className="justify-content-md-center" >
          <Col className="d-grid" md="8" style={{ height: "10vh" }}>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" id="smallKartOutput" style={{ fontSize: "7vh" }}>Kötid: {this.state.statsData.queueTime}min</Col>
          <Col className="text-center" id="doubleKartOutput" style={{ fontSize: "7vh" }}>Dubbla: {this.state.raceData.doubleKart}</Col>
        </Row>
        <Row className="justify-content-md-center" >
          <Col className="d-grid" md="8" style={{ height: "10vh" }}>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          {/*
            <Col className="text-center" style={{ fontSize: "2vh" }}>IP-{">"} {this.state.localIp}</Col>
          */}
          <Col className="text-center" style={{ fontSize: "2vh" }}>Senaste input-{">"} <StopWatch /></Col>
          <Col className="text-center" style={{ fontSize: "2vh" }}>Senaste query-{">"} {this.state.ioStats.timeSinceDbConnection}s</Col>
          <Col className="text-center" style={{ fontSize: "2vh" }}>Made by-{">"} Eskil Brännerud</Col>
          <SettingsSlide className="position-absolute top-0 start-0" settings={this.state.settings}></SettingsSlide>
        </Row>
        
      </Container>
    );
  }
}

export default DepotPage;