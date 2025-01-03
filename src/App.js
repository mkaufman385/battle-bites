import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FoodComparison from "./components/FoodComparison";
// import ComparisonDisplay from "./components/ComparisonDisplay";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/compare" element={<FoodComparison />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
