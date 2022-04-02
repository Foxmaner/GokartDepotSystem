import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {internalIpV6, internalIpV4} from 'internal-ip';
import StopWatch from './stopwatch';

import PouchDB from 'pouchdb';
import upsert from 'pouchdb-upsert';
PouchDB.plugin(upsert);

import DB from './db.js'


class DepotPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      db: new DB("RaceDataDB"),
      remoteDB: new PouchDB('http://localhost:5984/myremotedb'),
      settingsDB: new DB("SettingsDB"),


      localIp : "N/A",
      raceData: {"largeKart":"4","smallKart":"2","doubleKart":"0"},
      statsData: {"nextRace":"1","nrOfRaceQueue":"2","queueTime":"3"},
      ioStats: {"timeSinceDbConnection":0,"timeSinceButtonPress":0},
  };

  };

  async componentDidMount(){
    document.addEventListener("keydown", this.keyEventFunction, false);
    const ip = await internalIpV4()  
    console.log(ip)
    this.setState({
        localIp : ip
    })
  };

  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyEventFunction, false);
  };

  keyEventFunction(event){
    if(event.keyCode === 39) {
        console.log("höger")
    }else if(event.keyCode === 37){
        console.log("vänster")
    }
  }



  render() {
      

    return (
      <Container className="app bg-light shadow-5-strong" >
        <Row className="justify-content-md-center">
          <Col className="text-center" id="largeKartOutput" style={{fontSize: "7vh"}}>Depå</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" id="largeKartOutput" style={{fontSize: "7vh"}}>Nästa Race: {this.state.statsData.nextRace}</Col>
          <Col className="text-center" id="largeKartOutput" style={{fontSize: "7vh"}}>Stora: {this.state.raceData.largeKart}</Col>
        </Row>
        <Row className="justify-content-md-center" >
            <Col className="d-grid" md="8" style={{height: "10vh"}}>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" id="smallKartOutput" style={{fontSize: "7vh"}}>Race kvar: {this.state.statsData.nrOfRaceQueue}</Col>
          <Col className="text-center" id="doubleKartOutput" style={{fontSize: "7vh"}}>Små: {this.state.raceData.smallKart}</Col>
        </Row>
        <Row className="justify-content-md-center" >
            <Col className="d-grid" md="8" style={{height: "10vh"}}>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
        <Col className="text-center" id="smallKartOutput" style={{fontSize: "7vh"}}>Kötid: {this.state.statsData.queueTime}</Col>
          <Col className="text-center" id="doubleKartOutput" style={{fontSize: "7vh"}}>Dubbla: {this.state.raceData.doubleKart}</Col>
        </Row>
        <Row className="justify-content-md-center" >
            <Col className="d-grid" md="8" style={{height: "20vh"}}>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" style={{fontSize: "2vh"}}>IP-{">"} {this.state.localIp}</Col>
          <Col className="text-center" style={{fontSize: "2vh"}}>Senaste input-{">"} <StopWatch/></Col>
          <Col className="text-center" style={{fontSize: "2vh"}}>Senaste query-{">"} {this.state.ioStats.timeSinceDbConnection}s</Col> 
          <Col className="text-center" style={{fontSize: "2vh"}}>Made by-{">"} Eskil Brännerud</Col>
        </Row>
      </Container>
    );
  }
}

export default DepotPage;