//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPage from './Pages/ListPage';
import DetailPage from './Pages/DetailPage';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListPage} />
        <Route path="/detail/:issueNumber" component={DetailPage} />
      </Switch>
    </Router>
  );
};

export default App;


