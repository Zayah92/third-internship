import "./Results.css";
import Navbar from "../components/Navbar";
import galleryIcon from "../assets/gallery-icon.webp";
import cameraIcon from "../assets/camera-icon.webp";
import lineIcon from "../assets/resscanline.webp";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

export default function Result() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);

 
  useEffect(() => {
    if (!showCamera) return;

    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });

        const video = videoRef.current;
        if (!video) return;

        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;

        await video.play();

        setTimeout(() => {
          setIsCameraLoading(false);
        }, 500);
      } catch (err) {
        console.error("Camera error:", err);
        setShowCamera(false);
        setIsCameraLoading(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showCamera]);

  const generateConfidence = (options) => {
    let remaining = 100;
    const result = {};

    options.forEach((opt, i) => {
      if (i === options.length - 1) {
        result[opt] = remaining;
      } else {
        const val = Math.floor(Math.random() * remaining);
        result[opt] = val;
        remaining -= val;
      }
    });

    return result;
  };

  const pickTop = (obj) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])[0][0];

  const handleCapturedImage = (base64) => {
    setPreview(base64);

    setTimeout(() => {
      setIsProcessing(true);

      setTimeout(() => {
        const raceOptions = [
          "East Asian",
          "Black",
          "Middle Eastern",
          "South Asian",
          "White",
          "Southeast Asian",
          "Latino Hispanic",
        ];

        const ageOptions = [
          "0-2",
          "3-9",
          "10-19",
          "20-29",
          "30-39",
          "40-49",
          "50-59",
          "60-69",
          "70+",
        ];

        const genderOptions = ["Female", "Male"];

        const raceConfidence = generateConfidence(raceOptions);
        const ageConfidence = generateConfidence(ageOptions);
        const genderConfidence = generateConfidence(genderOptions);

        const fakeResponse = {
          race: pickTop(raceConfidence),
          raceConfidence,
          age: pickTop(ageConfidence),
          ageConfidence,
          gender: pickTop(genderConfidence),
          genderConfidence,
        };

        localStorage.setItem("analysisResult", JSON.stringify(fakeResponse));

       setIsProcessing(false);

        setTimeout(() => {
          alert("Image analyzed successfully!");
          navigate("/select");
        }, 300);
      }, 4000);
    }, 500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleCapturedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const startCamera = () => {
    setShowCamera(true);
    setIsCameraLoading(true);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/png");

    video.srcObject.getTracks().forEach((track) => track.stop());

    setShowCamera(false);

    handleCapturedImage(base64);
  };

  return (
    <>
      <Navbar />


      {!showCamera && (
        <section className="result">
          <p className="result__header">TO START ANALYSIS</p>

          <div className="results__preview">
            <p>Preview</p>
            <div className="results__preview--box">
              {preview && (
                <img src={preview} alt="" className="preview__img" />
              )}
            </div>
          </div>

          {!isProcessing && (
            <>
              <div className="result__orbit result__orbit--left">
                <div className="result__box result__box1"></div>
                <div className="result__box result__box2"></div>
                <div className="result__box result__box3"></div>

                <div className="result__icon-wrap result__icon-wrap--left">
                  <button className="result__icon--btn" onClick={startCamera}>
                    <img src={cameraIcon} alt="" className="result__icon--left" />
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
                    <img src={galleryIcon} alt="" className="result__icon--right" />
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
              <svg viewBox="0 0 100 100">
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
      )}

     
      {showCamera && (
        <section className="camera-layout">

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-video"
          />

          {isCameraLoading && (
            <div className="camera-loading">
              <img src={cameraIcon} alt="" className="camera-loading-icon" />
              <p className="camera-loading-text">
                Setting up Camera
                <span className="dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </p>
            </div>
          )}

          {!isCameraLoading && (
            <>
              <button className="camera-shutter" onClick={capturePhoto}></button>

             
            </>
          )}

          <div className="camera-footer">
            <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
            <div className="camera-footer__list">
              <p>NEUTRAL EXPRESSION.</p>
              <p>FRONTAL POSE.</p>
              <p>ADEQUATE LIGHTING.</p>
            </div>
          </div>


          <div
            className="footer__btn footer__btn--left"
            onClick={() => setShowCamera(false)}
          >
            <div className="triangle__box">
              <svg viewBox="0 0 100 100">
                <polygon points="100,0 0,50 100,100" />
              </svg>
            </div>
            <button className="btn primary">BACK</button>
          </div>

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </section>
      )}
    </>
  );
}