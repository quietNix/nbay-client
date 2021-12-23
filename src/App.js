import './App.scss';
import { HashRouter, Route, Routes } from "react-router-dom";
import Landing from './pages/landing/Landing';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Purchases from "./pages/purchases/Purchases";
import Sell from "./pages/sell/Sell";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/signin' element={<Signin />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/purchases' element={<Purchases />} />
        <Route exact path='/sell' element={<Sell />} />
      </Routes>
    </HashRouter>
  );
}

export default App;