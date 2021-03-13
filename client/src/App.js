// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

function App() {
  return (
    <Router>
      <div>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        {/* switch는 java의 switch와 동일하다. path에 해당하는 경로가 있으면 해당 route가 실행되고 멈춤.
          switch case문이라고 보면 됨. 없으면 break 없는 것처럼 쭉쭉 진행된다고 함 */}
        <Switch>
          <Route exact path="/" component = {LandingPage}/>
          <Route exact path="/LoginPage" component = {LoginPage} />
          <Route exact path="/RegisterPage">
            <RegisterPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;