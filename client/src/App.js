import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup"; 
function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route path="*" element={<p>Invalid Path.</p>} />
      </Routes>
    </Router>
  );
}

export default App;
