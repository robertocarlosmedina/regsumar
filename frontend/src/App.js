import React from 'react'
import { Route } from 'react-router-dom'
import Login from './components/login/login'
import Homepage from './components/homepage/homepage';


function App() {

  
  return (
    <React.Fragment>
        <Route exact path="/" component={Login}/>
        <Route exact path="/homepage/:role/:child/:id" component={Homepage}/>
        <Route exact path="/homepage/:role/:child/:id/:sumId/:classId" component={Homepage}/>
    </React.Fragment>
  );
}

export default App;
