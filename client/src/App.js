import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/signup"; 
import Login from "./pages/login";
import Home from "./pages/home";


function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />}/>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="*" element={<p>Oops! The page you're looking for doesn't exist.</p>} />
      </Routes>
    </Router>
  );
}

export default App;
