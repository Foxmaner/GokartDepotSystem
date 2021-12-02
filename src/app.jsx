import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DepotPage from './components/depotPage.js'

import 'bootstrap/dist/css/bootstrap.min.css';


function App(){
    return(
    <DepotPage />                 
    )
}





ReactDOM.render(<App/>,document.getElementById('root'));