import { useState } from 'react';

const Header = () => {
  const [nav, setNav] = useState(false);
  const changeBg = () => {
    if (window.scrollY >= 80) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  window.addEventListener('scroll', changeBg);
  return (
    <header className={!nav ? 'nav' : 'nav-active'}>
      <div className="container">
        <nav>
          <div className="logo">
            <a href="/">Raouf.</a>
          </div>
          <ul className="nav_list">
            <li>
              <a href="/">ABOUT ME</a>
            </li>
            <li>
              <a href="/">MY WORK</a>
            </li>
            <li>
              <a href="/">MY SKILLS</a>
            </li>
          </ul>
          <div className="holder p-relative">
            <a className="btn-contact" href="/">
              CONTACT ME
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
