import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/connect-wallet">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/connect-wallet" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  );
};

export default App;
