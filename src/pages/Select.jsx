import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Select.css";

export default function Select() {
     const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) return null;

return (
  <>
    <Navbar />

      <div className="select__content">
        <h1>A.I. ANALYSIS</h1>
        <h3 className="select__content__subtitle">A.I. HAS ESTIMATED THE FOLLOWING.</h3>
        <h3 className="select__content__subtitle">FIX ESTIMATED INFORMATION IF NEEDED.</h3>
        </div>



        <section>

<div className="select__diamond">
  <button className="select__tile select__tile--top"  onClick={() => navigate("/summary")}>  <span>DEMOGRAPHICS</span></button>
  <button className="select__tile select__tile--left">  <span>COSMETIC <br />CONCERNS</span></button>
  <button className="select__tile select__tile--right">  <span>SKIN TYPE DETAILS</span></button>
  <button className="select__tile select__tile--bottom">  <span>WEATHER</span></button>
</div>
 


        <div
          className="footer__btn footer__btn--left"
          onClick={() => navigate("/result")}
        >
          <div className="triangle__box">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="100,0 0,50 100,100" />
            </svg>
          </div>
          <button className="btn primary">BACK</button>
        </div>

            <div
            className="footer__btn footer__btn--right"
            onClick={() => navigate("/summary")}
          >
            <button className="btn primary">SUMMARY</button>
            <div className="triangle__box">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0,0 100,50 0,100" />
              </svg>
            </div>
          </div>
     
    </section>
  </>
);
}