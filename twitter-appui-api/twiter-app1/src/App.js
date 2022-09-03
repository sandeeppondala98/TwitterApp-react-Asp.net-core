import "./App.css";
import HomeCarosel from "./Components/HomeCarosel";
//import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
//import Register from "./Components/Register";
//import Home from "./Components/Home";
//import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

      {/* <main className="form-signin">
        <BrowserRouter>
            <Route exact path="/home" element={<Home/>}/>
      <BrowserRouter/>

        <BrowserRouter>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </BrowserRouter>
      </main> */}
    </div>
  );
}

export default App;
