import Shape1 from '../assets/Group 1.svg';
import Shape2 from '../assets/Group 2.svg';
import LaptopImage from '../assets/raouf.png';
import Vector1 from '../assets/Vector 12.svg';
import Vector2 from '../assets/Vector 11.svg';
import Arrow from '../assets/Arrow.svg';
import Icon1 from '../assets/g-icon.svg';
import Icon2 from '../assets/l-icon.svg';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { MacbookScroll } from '../components/laptop';

const Home = () => {
  return (
    <main>
      <section>
        <div className="container">
          <div className="qualities">
            <img
              style={{ height: '2em' }}
              draggable="false"
              src={Vector1}
              alt=""
            />
            <p style={{ fontSize: '1.1rem' }}>
              <Typewriter
                options={{
                  strings: [
                    'Passionate',
                    'Hardworker',
                    'Fast Learner',
                  ],
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
                CONTACT ME
              </motion.a>
              <motion.a
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  ease: 'linear',
                }}
                className="clr-text btn btn-secondary"
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
      </section>
      <section style={{ marginTop: '5em', height: 800 }}>
        <h1 className="main-text" style={{ paddingBottom: '.5em' }}>
          About me
        </h1>
        <div className="overflow-hidden dark:bg-[#0B0B0F] ">
          <MacbookScroll
            // badge={
            //   <a href="https://peerlist.io/manuarora">
            //     <Badge className="h-10 w-10 transform -rotate-12" />
            //   </a>
            // }
            src={LaptopImage}
            showGradient={false}
          />
        </div>
      </section>
    </main>
  );
};
// const Badge = ({ className }) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 56 56"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//     >
//       <path
//         d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
//         fill="#00AA45"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
//         fill="#219653"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
//         fill="#24292E"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
//         fill="white"
//       ></path>
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
//         fill="#24292E"
//       ></path>
//     </svg>
//   );
// };

export default Home;
