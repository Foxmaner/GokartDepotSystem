import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DepotPage from "./components/depotPage.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function render() {
  ReactDOM.render(<DepotPage/>,document.getElementById('root'));
}

render();