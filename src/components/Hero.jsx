import "./Hero.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
   const navigate = useNavigate();
  return (
   <section className="hero">
  <svg className="hero__triangle left" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="0,0 85,50 0,100" />
  </svg>

<div className="hero__triangle__btn left">
  <div className="hero__triangle__box">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <polygon points="100,0 0,50 100,100" />
    </svg>
  </div>
  <button className="btn primary">DISCOVER A.I.</button>
</div>

  <svg className="hero__triangle right" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="100,0 15,50 100,100" />
  </svg>

 <div
      className="hero__triangle__btn right"
      onClick={() => navigate("/test")}
    >
      <div className="hero__triangle__box">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,0 100,50 0,100" />
        </svg>
      </div>

      <button className="btn secondary">
        Take Test →
      </button>
    </div>

  <div className="hero__title">
    <h1>
      Sophisticated <br /> skincare
    </h1>
  </div>

  <div className="hero__description">
    <p>
      Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
    </p>
  </div>
</section>
  );
}