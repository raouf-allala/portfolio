import { useEffect, useState } from 'react';
import LogoL from '../assets/RA.png';
import LogoD from '../assets/Raouf_Allala.png';
import DownArrow from '../assets/down-arrow.svg';
import Cv from '../assets/Raouf-Allala-CV.pdf';
const Header = () => {
  const [nav, setNav] = useState(false);
  useEffect(() => {
    // Previously this listener was added on every render and never removed.
    const changeBg = () => setNav(window.scrollY >= 80);
    changeBg();
    window.addEventListener('scroll', changeBg, { passive: true });
    return () => window.removeEventListener('scroll', changeBg);
  }, []);
  return (
    <header className={!nav ? 'nav' : 'nav-active'}>
      <div className="container">
        <nav>
          <div className="logo">
            {!nav ? (
              <a href="/">
                <img src={LogoL} alt="Raouf Allala" />
              </a>
            ) : (
              <a href="/">
                <img src={LogoD} alt="Raouf Allala" />
              </a>
            )}
          </div>
          <ul className="nav_list">
            <li>
              <a href="#about-me">ABOUT ME</a>
            </li>
            <li className="drop-down-link">
              <a href="#personal">MY WORK</a>
              <img src={DownArrow} alt="" aria-hidden="true" />
              <div className="drop-down">
                <ul>
                  <li>
                    <a href="#personal">Personal Projects</a>
                    <div className="layer"></div>
                    <div className="layer"></div>
                    <div className="layer"></div>
                  </li>
                  <li>
                    <a href="#codev">CodevIT</a>
                    <div className="layer"></div>
                    <div className="layer"></div>
                    <div className="layer"></div>
                  </li>
                  <li>
                    <a href="#webexpo">Webexpo</a>
                    <div className="layer"></div>
                    <div className="layer"></div>
                    <div className="layer"></div>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#skills">MY SKILLS</a>
            </li>
          </ul>
          <div className="holder p-relative">
            <a className="btn-contact" href={Cv} download={true}>
              My Resume
            </a>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
