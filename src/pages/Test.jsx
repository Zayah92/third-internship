import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Test.css";

export default function Test() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (step === 0 && input.trim() !== "") {
        localStorage.setItem("userName", input);
        setStep(1);
        setInput("");
      } else if (step === 1 && input.trim() !== "") {
        localStorage.setItem("userCity", input);
        setStep(2);
        setInput("");

        setTimeout(() => {
          setStep(3);
        }, 2000);
      }
    }
  };

  return (
    <>
      <Navbar />

      <section className="test">
        <p className="test__header">TO START ANALYSIS</p>
        <div className="orbit">
          <div className="box box1"></div>
          <div className="box box2"></div>
          <div className="box box3"></div>

          <div className="center">
            <p className="center__label">
              {step === 2 ? (
                <span className="loading">
                  Processing Submission
                  <span className="dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </span>
              ) : step === 3 ? (
                "THANK YOU!"
              ) : "CLICK TO TYPE"}
            </p>

            {step === 3 && (
              <p className="center__sub">
                Proceed to the next step
              </p>
            )}

            <input
              className="center__input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                step === 0
                  ? "Introduce Yourself"
                  : step === 1
                  ? "your city name"
                  : ""
              }
              disabled={step >= 2}
            />
          </div>
        </div>

        {/* BUTTON (LEFT) */}
        <div
          className="footer__btn footer__btn--left"
          onClick={() => navigate("/")}
        >
          <div className="triangle__box">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="100,0 0,50 100,100" />
            </svg>
          </div>
          <button className="btn primary">BACK</button>
        </div>

        {/* BUTTON (RIGHT) */}
        {step === 3 && (
          <div
            className="footer__btn footer__btn--right"
            onClick={() => navigate("/result")}
          >
            <button className="btn primary">PROCEED</button>
            <div className="triangle__box">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0,0 100,50 0,100" />
              </svg>
            </div>
          </div>
        )}
      </section>
    </>
  );
}