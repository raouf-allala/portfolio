import Shape1 from '../assets/Group 1.svg';
import Shape2 from '../assets/Group 2.svg';
import Vector1 from '../assets/Vector 12.svg';
import Vector2 from '../assets/Vector 11.svg';
import Arrow from '../assets/Arrow.svg';
import Icon1 from '../assets/g-icon.svg';
import Icon2 from '../assets/l-icon.svg';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
const Home = () => {
  return (
    <main>
      <div className="container">
        <div className="qualities">
          <img draggable="false" src={Vector1} alt="" />
          <p>
            <Typewriter
              options={{
                strings: ['Passionate', 'Hardworker', 'Fast Learner'],
                delay: 40,
                deleteSpeed: 40,
                pauseFor: 1300,
                autoStart: true,
                loop: true,
              }}
            />
          </p>
        </div>
        <div className="main-content">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="main-text"
          >
            <p className="subtitle">
              Software engineering student and Freelancer
            </p>
            <h1>
              A <span className="highlighted">full-stack</span> web
              developer with{' '}
              <span className="highlighted">UI/UX</span> expertise
              ready to get hired.
            </h1>
          </motion.div>
          <div className="main-cta">
            <motion.a
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: 'linear',
              }}
              className="btn"
              href="#"
            >
              HIRE ME
            </motion.a>
            <motion.a
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: 'linear',
              }}
              className="clr-text"
              href="#"
            >
              VIEW MY WORK
            </motion.a>
          </div>
          <div className="main-scroll">
            <a className="scroll-btn" href="/">
              <img draggable="false" src={Arrow} alt="" />
            </a>
            <div className="scroll-text">
              <p>Read more about me</p>
            </div>
          </div>
          <div className="main-socials">
            <ul className="socials">
              <motion.li
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="social"
              >
                <a href="/">
                  <img draggable="false" src={Icon1} alt="" />
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="social"
              >
                <a href="/">
                  <img draggable="false" src={Icon2} alt="" />
                </a>
              </motion.li>
            </ul>
            <img draggable="false" src={Vector2} alt="" />
          </div>
        </div>
      </div>
      <motion.img
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="shape1"
        src={Shape1}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="shape2"
        src={Shape2}
        alt=""
      />
    </main>
  );
};

export default Home;
