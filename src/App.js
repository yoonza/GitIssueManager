import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPage from './Pages/ListPage';
import DetailPage from './Pages/DetailPage';
import { IssueProvider } from './Store/IssueContext'; // IssueProvider import

const App = () => {
  return (
    <Router>
      <IssueProvider>
        <Switch>
          <Route path="/" exact component={ListPage} />
          <Route path="/detail/:gitIssueNumber" component={DetailPage} />
        </Switch>
      </IssueProvider>
    </Router>
  );
};

export default App;

