import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Form from '../src/Pages/Form'
import LandingPage from '../src/Pages/LandingPage'
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
