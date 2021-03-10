
import './css/App.css';
import React from 'react'
import { BrowserRouter,Route } from 'react-router-dom'
import Nav from './view/navbar'
import OscComponents from './view/osc-components'

function App() {
  return (
    <div className="App" 
     // style={{backgroundColor: '#282828'}}
     >
     
      <BrowserRouter>
        <div>
            <Nav />
            <div className="oscillators">
            <Route exact path="/" component={OscComponents} /> 
            </div>
        </div>
      </BrowserRouter>
  
    
    </div>
  );
}

export default App;
