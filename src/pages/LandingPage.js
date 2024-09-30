import React from "react";
import "../styles/LandingPage.css";
// import Header from "../components/Header";
import { Link } from "react-router-dom"; // Import Link

function LandingPage() {
  return (
    <div className="landing-page">
      {/* <Header /> */}
      <div className="content">
        <div className="welcome">
          <h1>Welcome to Battle Bites</h1>
        </div>
        <div className="food-type-description">
          <h3>
            Whole foods are generally healthier than processed foods because
            they are minimally altered from their natural state and retain more
            nutrients. Whole foods like fruits, vegetables, whole grains, and
            lean proteins are rich in vitamins, minerals, fiber, and
            antioxidants. They help support better digestion, improve overall
            health, and reduce the risk of chronic diseases like heart disease
            and diabetes.
          </h3>
          <h3>
            Processed foods, on the other hand, often contain added sugars,
            unhealthy fats, preservatives, and refined ingredients, which can
            contribute to weight gain, poor nutrition, and increased health
            risks when consumed in excess.
          </h3>
        </div>

        <h2 className="button-caption">
          Find out how whole foods and processed foods compare based on
          nutritional information.
        </h2>

        {/* Style the Link like a button */}
        <Link to="/compare" className="compare-foods-button">
          Compare Foods NOW
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
