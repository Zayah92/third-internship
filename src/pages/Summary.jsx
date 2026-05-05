import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Summary.css";

export default function Summary() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("race");
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!data) return;

    if (activeTab === "race") setSelectedKey(data.race);
    if (activeTab === "age") setSelectedKey(data.age);
    if (activeTab === "gender") setSelectedKey(data.gender);
  }, [data, activeTab]);

  if (!data) return null;

  let percent = 0;

  if (activeTab === "race") {
    percent = data.raceConfidence?.[selectedKey] || 0;
  }

  if (activeTab === "age") {
    percent = data.ageConfidence?.[selectedKey] || 0;
  }

  if (activeTab === "gender") {
    percent = data.genderConfidence?.[selectedKey] || 0;
  }

  return (
    <>
      <Navbar />

      <div className="select__content">
        <h1>A.I. ANALYSIS</h1>
        <h1 className="summary__content__title">DEMOGRAPHICS</h1>
        <h3 className="summary__content__subtitle">
          PREDICTED RACE & AGE
        </h3>
      </div>

      <div className="summary__content">

        {/* LEFT TABS */}
        <div className="summary__content__quickfacts">

          <div
            className={`race ${activeTab === "race" ? "active" : ""}`}
            onClick={() => setActiveTab("race")}
          >
            {data.race} <br /> RACE
          </div>

          <div
            className={`age ${activeTab === "age" ? "active" : ""}`}
            onClick={() => setActiveTab("age")}
          >
            {data.age} <br /> AGE
          </div>

          <div
            className={`gender ${activeTab === "gender" ? "active" : ""}`}
            onClick={() => setActiveTab("gender")}
          >
            {data.gender} <br /> SEX
          </div>

        </div>

        {/* MIDDLE PANEL */}
        <div className="summary__content__analysis">

          <h1 className="summary__result--title">{selectedKey}</h1>

          <div
            className="progress-circle"
            style={{
              background: `conic-gradient(
                black ${percent * 3.6}deg,
                #e5e7eb ${percent * 3.6}deg
              )`
            }}
          >
            <div className="progress-inner">
              <span>{percent}%</span>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="summary__content__details">

          <p className="summary__confidence-title">
            {activeTab.toUpperCase()}
          </p>
          <p className="summary__confidence-sub">A.I. CONFIDENCE</p>

          {Object.entries(
            activeTab === "race"
              ? data.raceConfidence || {}
              : activeTab === "age"
              ? data.ageConfidence || {}
              : data.genderConfidence || {}
          ).map(([key, value]) => (
            <div
              key={key}
              className={`confidence-row ${
                selectedKey === key ? "active-row" : ""
              }`}
              onClick={() => setSelectedKey(key)}
            >
              <span>{key}</span>
              <span>{value}%</span>
            </div>
          ))}

        </div>

      </div>

      
      <div className="summary__mobile-footer">

        {/* BACK BUTTON */}
        <div
          className="footer__btn footer__btn--left mobile--button"
          onClick={() => navigate("/select")}
        >
          <div className="triangle__box">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="100,0 0,50 100,100" />
            </svg>
          </div>
          <button className="btn primary">BACK</button>
        </div>

        {/* HOME BUTTON */}
        <div
          className="footer__btn footer__btn--right mobile--button"
          onClick={() => navigate("/")}
        >
          <button className="btn primary">HOME</button>
          <div className="triangle__box">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,0 100,50 0,100" />
            </svg>
          </div>
        </div>

      </div>
    </>
  );
}