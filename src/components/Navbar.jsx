import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
       <p className="logo-text"><b>SKINSTRIC</b> [INTRO]</p> 
      </div>
    

      <div>
        <button className="code">
         ENTER CODE
        </button>
      </div>
    </nav>
  );
}