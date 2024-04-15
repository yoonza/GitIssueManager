import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPage from './Pages/ListPage';
import DetailPage from './Pages/DetailPage';
import { SelectedIssueProvider } from './Components/SelectedIssueContext';


function App() {
  return (
    <Router>
      <SelectedIssueProvider>
        <Switch>
          <Route exact path="/" component={ListPage} />
          <Route path="/detail/:issueNumber" component={DetailPage} />
        </Switch>
      </SelectedIssueProvider>
    </Router>
  );
}

export default App;


