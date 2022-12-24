import { useState } from "react";

const Header = () => {
  const [nav,setNav] = useState(false);
  const changeBg = () => {
    if(window.scrollY >= 80){
      setNav(true);
    }
    else{
      setNav(false);
    }
  }
  window.addEventListener("scroll",changeBg);
  return (
    <header className={!nav ? "nav" : "nav-active"}>
      <div className="container">
        <nav>
          <div className="logo">
            <a href="#">Raouf.</a>
          </div>
          <ul className="nav_list">
            <li>
              <a href="#">ABOUT ME</a>
            </li>
            <li>
              <a href="#">MY WORK</a>
            </li>
            <li>
              <a href="#">CONTACT ME</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
