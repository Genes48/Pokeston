import './App.css';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreatePokemon from './components/CreatePokemon';
import Pokemon from './components/Pokemon';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component = {LandingPage} />
        <Route path="/home" component = {Home} />
        <Route path="/pokemon/:id" component = {Pokemon} />
        <Route path="/create" component = {CreatePokemon} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
