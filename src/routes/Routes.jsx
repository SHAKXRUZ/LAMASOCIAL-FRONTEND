import { Route } from "react-router-dom";
import Registr from "./registr/Registr";
import Login from "./login/Login";
import Home from "../components/Home";
import Profeli from "./profeli/Profeli";
const Routes = () => {
  return (
    <>
      <Route exact path="/">
        <Registr />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/profeli">
        <Profeli />
      </Route>
    </>
  );
};

export default Routes;
