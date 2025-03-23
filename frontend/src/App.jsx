import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import InfluencerDetail from "./pages/InfluencerDetail";
import Admin from "./pages/Admin.jsx";
import {Home} from "./pages/Home.jsx";
import Header from "./pages/Header.jsx";
import ContactPage from "./pages/ContactUs.jsx";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
