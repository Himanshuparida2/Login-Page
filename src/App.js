import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import Home from "./components/home";
import SignupPage from "./components/SignupPage";
import NameProvider from "./context/NameProvider";

function App() {
  return (
    <NameProvider>
        <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
        </BrowserRouter>
      </NameProvider>
        
  );
}

export default App;
