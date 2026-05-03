import "./Results.css";
import Navbar from "../components/Navbar";
import galleryIcon from "../assets/gallery-icon.webp";
import cameraIcon from "../assets/camera-icon.webp";
import lineIcon from "../assets/resscanline.webp";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function Result() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);

      setTimeout(() => {
        setIsProcessing(true);

        setTimeout(() => {
          const fakeResponse = {
            age: Math.floor(Math.random() * 40) + 18,
            gender: Math.random() > 0.5 ? "Male" : "Female",
            skinType: ["Dry", "Oily", "Combination"][
              Math.floor(Math.random() * 3)
            ],
          };

          localStorage.setItem("analysisResult", JSON.stringify(fakeResponse));

          setIsProcessing(false);
          alert("Image analyzed successfully!");
          navigate("/final");
        }, 4000);
      }, 1500);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Navbar />

      <section className="result">
        {!isProcessing && (
          <>
            <p className="result__header">TO START ANALYSIS</p>

            <div className="results__preview">
              <p>Preview</p>
              <div className="results__preview--box">
                {preview && (
                  <img src={preview} alt="" className="preview__img" />
                )}
              </div>
            </div>

            <div className="result__orbit result__orbit--left">
              <div className="result__box result__box1"></div>
              <div className="result__box result__box2"></div>
              <div className="result__box result__box3"></div>

              <div className="result__icon-wrap result__icon-wrap--left">
                <button className="result__icon--btn">
                  <img
                    src={cameraIcon}
                    alt=""
                    className="result__icon--left"
                  />
                </button>
                <img src={lineIcon} alt="" className="line__icon--left" />
              </div>

              <p className="result__text--left result__text">
                ALLOW A.I. <br />TO SCAN YOUR FACE
              </p>
            </div>

            <div className="result__orbit result__orbit--right">
              <div className="result__box result__box1"></div>
              <div className="result__box result__box2"></div>
              <div className="result__box result__box3"></div>

              <div className="result__icon-wrap result__icon-wrap--right">
                <button
                  className="result__icon--btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  <img
                    src={galleryIcon}
                    alt=""
                    className="result__icon--right"
                  />
                </button>
                <img src={lineIcon} alt="" className="line__icon--right" />
              </div>

              <p className="result__text--right result__text">
                ALLOW A.I. <br />ACCESS GALLERY
              </p>
            </div>
          </>
        )}

        {isProcessing && (
          <div className="result__loading">
            <div className="result__orbit result__orbit--center">
              <div className="result__box result__box1"></div>
              <div className="result__box result__box2"></div>
              <div className="result__box result__box3"></div>
            </div>

            <p className="result__loading-text">
              Preparing Your Analysis
              <span className="dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </p>
          </div>
        )}


        <div
          className="footer__btn footer__btn--left"
          onClick={() => navigate("/test")}
        >
          <div className="triangle__box">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="100,0 0,50 100,100" />
            </svg>
          </div>
          <button className="btn primary">BACK</button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </section>
    </>
  );
}