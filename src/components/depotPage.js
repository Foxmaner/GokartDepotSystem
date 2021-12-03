import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {internalIpV6, internalIpV4} from 'internal-ip';


class DepotPage extends React.Component {
  constructor(props) {
    super(props)
  };
  

  state = {
      localIp : "N/A"
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
        console.log("hÖger")
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
          <Col className="text-center" style={{fontSize: "2vh"}}>IP-Adress: {this.state.localIp}</Col>
          <Col className="text-center" style={{fontSize: "2vh"}}>Senaste knapptryck: 10s</Col>
          <Col className="text-center" style={{fontSize: "2vh"}}>Senaste anslutning: 5s</Col> 
          <Col className="text-center" style={{fontSize: "2vh"}}>Program by: Eskil Brännerud</Col>
        </Row>
      </Container>
    );
  }
}

export default DepotPage;