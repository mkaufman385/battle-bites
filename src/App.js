import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FoodComparison from "./components/FoodComparison";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/compare" element={<FoodComparison />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
