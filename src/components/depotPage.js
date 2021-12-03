import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class DepotPage extends React.Component {
  constructor(props) {
    super(props)
  };
  

  state = {
  };



  render() {
      

    return (
      <Container className="app bg-light shadow-5-strong" >
        <Row className="justify-content-md-center">
          <Col className="text-center" id="largeKartOutput" style={{fontSize: "7vh"}}>Depå</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" id="largeKartOutput" style={{fontSize: "7vh"}}>Nästa Race: 1</Col>
          <Col className="text-center" id="largeKartOutput" style={{fontSize: "7vh"}}>Stora: 2</Col>
        </Row>
        <Row className="justify-content-md-center" >
            <Col className="d-grid" md="8" style={{height: "10vh"}}>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" id="smallKartOutput" style={{fontSize: "7vh"}}>Race kvar: 8</Col>
          <Col className="text-center" id="doubleKartOutput" style={{fontSize: "7vh"}}>Små: 5</Col>
        </Row>
        <Row className="justify-content-md-center" >
            <Col className="d-grid" md="8" style={{height: "10vh"}}>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
        <Col className="text-center" id="smallKartOutput" style={{fontSize: "7vh"}}>Kötid: 20min</Col>
          <Col className="text-center" id="doubleKartOutput" style={{fontSize: "7vh"}}>Dubbla:1</Col>
        </Row>
        <Row className="justify-content-md-center" >
            <Col className="d-grid" md="8" style={{height: "20vh"}}>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" style={{fontSize: "2vh"}}>IP-Adress: 192.168.120.100</Col>
          <Col className="text-center" style={{fontSize: "2vh"}}>Senaste knapptryck: 10s</Col>
          <Col className="text-center" style={{fontSize: "2vh"}}>Senaste anslutning: 5s</Col> 
          <Col className="text-center" style={{fontSize: "2vh"}}>Program by: Eskil Brännerud</Col>
        </Row>
      </Container>
    );
  }
}

export default DepotPage;