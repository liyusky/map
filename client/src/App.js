import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Switch} from 'react-router-dom';
import TableComponent from './page/table/table.jsx'
import UploadComponent from './page/upload/upload.jsx'


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/table" component={TableComponent}/>
        <Route exact path="/upload" component={UploadComponent}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
