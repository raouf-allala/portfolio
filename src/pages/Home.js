import Shape1 from '../assets/Group 1.svg';
import Shape2 from '../assets/Group 2.svg';
// import LaptopImage from '../assets/raouf.png';
import Vector1 from '../assets/Vector 12.svg';
import Vector2 from '../assets/Vector 11.svg';
import Arrow from '../assets/Arrow.svg';
import Icon1 from '../assets/g-icon.svg';
import Icon2 from '../assets/l-icon.svg';
import Webexpo from '../assets/webexpo/webexpo.PNG';
import Webexpo2 from '../assets/webexpo/webexpo2.PNG';
import { AnimatePresence, motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
// import { MacbookScroll } from '../components/laptop';
import { cn } from '../lib/utils';
import { useEffect, useRef, useState } from 'react';

import { useMotionValueEvent, useScroll } from 'framer-motion';
import Maqam from '../assets/Capture.PNG';
import Storify from '../assets/Capture2.PNG';
import Portfolio from '../assets/Capture3.PNG';
import { BentoItem } from '../components/BentoItem';
import { BentoGrid } from '../components/BentoGrid';
import data from '../data/projects.json';
const Home = () => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
  const items = [
    {
      title: 'Who Am I',
      description: `
          Hi, I'm Raouf Allala, a passionate software engineer with a
          diverse background in full-stack development. With over
         3 years of experience, I've worked on a wide range of
          projects, from building scalable web applications to
          designing intuitive user interfaces.
        `,
      link: '#',
    },
    {
      title: 'Fullstack Development',
      description: `
          I specialize in both front-end and back-end development, building
          complete web applications from start to finish. My work ensures that
          everything runs smoothly and efficiently, making sure users have a
          great experience.
        `,
      link: '#',
    },
    {
      title: 'UI/UX',
      description: `
          I focus on creating user-friendly and visually appealing designs.
          My goal is to make sure users find the interfaces easy to navigate
          and enjoyable to use.
        `,
      link: '#',
    },
  ];
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ['start start', 'end start'],
  });
  const content = [
    {
      title: 'Maqam association management system',
      description:
        'The Management System is designed to efficiently manage member profiles, organize groups, and track trimester-based contributions. It allows for detailed record-keeping, group assignments, and generates comprehensive PDF reports on memberships and contributions, ensuring streamlined operations and transparency.',
      content: (
        <a
          className="relative group  block p-1 h-full w-full"
          href="/"
        >
          <img src={Maqam} alt="" />
        </a>
      ),
    },
    {
      title: 'My Storify',
      description:
        'My Storify unites multiple sellers in one online marketplace. Vendors manage their stores, listings, and orders independently, while customers enjoy a unified shopping cart, product reviews, and advanced search. Admins approve vendors, manage commissions, and access sales reports. Secure payments and dispute resolution ensure safety, while promotions and SEO tools boost visibility, making My Storify ideal for a thriving marketplace.',
      content: (
        <a
          className="relative group  block p-1 h-full w-full"
          href="/"
        >
          <img src={Storify} alt="" />
        </a>
      ),
    },
    {
      title: 'My Portfolio',
      description:
        'My portfolio, designed and coded by me, showcases my projects, skills, and experience through a sleek, modern, and responsive interface. Each project includes detailed descriptions, images, and links to demos or repositories. The clean, intuitive navigation ensures easy exploration of my work and contact options, reflecting my passion for creating engaging web experiences.',
      content: (
        <a
          className="relative group block p-1 h-full w-full"
          href="/"
        >
          <img src={Portfolio} alt="" />
        </a>
      ),
    },
    // {
    //   title: '',
    //   description: '',
    //   content: '',
    // },
  ];
  const cardLength = content.length;
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map(
      (_, index) => index / cardLength
    );
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });
  const backgroundColors = [
    'var(--clr-bg)',
    'var(--clr-bg)',
    'var(--clr-bg)',
  ];
  const linearGradients = [
    'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(182,255,233,1) 64%, rgba(17,91,239,1) 100%);',
    'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(182,255,233,1) 64%, rgba(17,91,239,1) 100%);',
    'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(182,255,233,1) 64%, rgba(17,91,239,1) 100%);',
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(
      linearGradients[activeCard % linearGradients.length]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCard]);
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
                Full-stack Developer{' '}
                <a
                  style={{
                    color: '#007aff',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                  }}
                  href="https://codevit.net/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @CodevIT
                </a>
              </p>
              <h1>
                A <span className="highlighted">full-stack </span>
                developer with{' '}
                <span className="highlighted">UI/UX</span> expertise.
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
                href="#personal"
              >
                VIEW MY WORK
              </motion.a>
            </div>
            <div className="main-scroll">
              <a className="scroll-btn" href="#about-me">
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
                  <a
                    href="https://github.com/raouf-allala"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img draggable="false" src={Icon1} alt="" />
                  </a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="social"
                >
                  <a
                    href="https://www.linkedin.com/in/raouf-allala-80b2322b4/"
                    target="_blank"
                    rel="noreferrer"
                  >
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
      <section style={{ marginTop: '5em' }} id="about-me">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
                About me
              </h2>
            </div>
          </div>
          <div
            className={cn(
              'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-6 gap-2'
            )}
          >
            {items.map((item, idx) => (
              <a
                href={item?.link}
                key={item?.link}
                className="relative group  block p-1 h-full w-full"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-[#b6ffe9] dark:bg-slate-800/[0.8] block  rounded-3xl"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>
                <Card>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>
                    {item.description}
                  </CardDescription>
                </Card>
              </a>
            ))}
          </div>
          {/* <div className="overflow-hidden dark:bg-[#0B0B0F] "> */}
          {/* <MacbookScroll
            // badge={
            //   <a href="https://peerlist.io/manuarora">
            //     <Badge className="h-10 w-10 transform -rotate-12" />
            //   </a>
            // }
            src={LaptopImage}
            showGradient={false}
          /> */}
          {/* </div> */}
        </div>
      </section>
      <section style={{ marginTop: '5em' }} id="personal">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-10">
              Personal Projects
            </h2>
          </div>
        </div>
        <motion.div
          animate={{
            backgroundColor:
              backgroundColors[activeCard % backgroundColors.length],
          }}
          className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scrollbar-hide"
          ref={ref}
        >
          <div className="div relative flex items-start px-4">
            <div className="max-w-2xl">
              {content.map((item, index) => (
                <div key={item.title + index} className="my-20">
                  <div className="qualities">
                    <img
                      style={{ height: '2em' }}
                      draggable="false"
                      src={Vector1}
                      alt=""
                    />
                    <motion.h2
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: activeCard === index ? 1 : 0.3,
                      }}
                      className="text-2xl font-bold text-[#b6ffe9]"
                    >
                      {item.title}
                    </motion.h2>
                  </div>
                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    className="text-kg text-slate-300 max-w-sm mt-10"
                  >
                    {item.description}
                  </motion.p>
                </div>
              ))}
              <div className="h-40" />
            </div>
          </div>
          <div
            style={{ background: backgroundGradient }}
            className={cn(
              'hidden lg:block h-max w-2/4 rounded-md bg-white sticky top-10 overflow-hidden hover:scale-105 transition-all ease-in duration-300'
            )}
          >
            {content[activeCard].content ?? null}
          </div>
        </motion.div>
      </section>
      <section style={{ marginTop: '3em' }} id="codev">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-10">
              Projects With{' '}
              <a
                style={{
                  color: '#007aff',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
                href="https://codevit.net/"
                target="_blank"
                rel="noreferrer"
              >
                CodevIT
              </a>
            </h2>
          </div>
        </div>
        <BentoGrid className="container mx-auto md:auto-rows-[30rem] lg:auto-rows-[35rem]">
          {data.map((project, i) => (
            <BentoItem
              key={i}
              title={project.title}
              header={project.img}
              description={project.category}
              link={project.link}
              className={cn('[&>p:text-lg]', project.style)}
              // icon={item.icon}
            />
          ))}
        </BentoGrid>
      </section>
      <section
        style={{
          marginTop: '3em',
          background: '#021b2d',
          paddingBlock: '3em',
        }}
        id="webexpo"
      >
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-10  font-webexpo">
                Webexpo
              </h2>
            </div>
          </div>
          <div className="flex gap-12">
            <p>
              I have had the incredible opportunity to be part of the
              organizing team for{' '}
              <a
                style={{ color: '#115bef', fontWeight: 'bold' }}
                href="https://webexpo-dz.com/"
                target="_blank"
                rel="noreferrer"
              >
                Webexpo
              </a>
              . This experience has allowed me to dive into the
              intricate planning and execution required to make such a
              large-scale event successful. As a member of the IT
              team, I have had the privilege to ensure that all
              technical aspects of the event run smoothly, from
              managing the event’s website and online registration
              system to setting up and maintaining the technical
              infrastructure on-site.
            </p>
            <img
              style={{
                width: '45%',
                borderRadius: 5,
                marginTop: '2em',
              }}
              src={Webexpo}
              alt=""
            />
          </div>
          <div className="flex gap-12 flex-row-reverse mt-10">
            <p
              style={{
                marginTop: '2em',
              }}
            >
              Additionally, I worked on developing and maintaining the
              admin dashboard, registration system, and check-in
              system for Webexpo. Me and the{' '}
              <a
                style={{
                  color: '#007aff',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
                href="https://codevit.net/"
                target="_blank"
                rel="noreferrer"
              >
                CodevIT
              </a>{' '}
              team created a streamlined and efficient registration
              process, ensuring a user-friendly experience for all
              attendees. For check-ins, We implemented a mobile app
              solution, which allowed for quick and easy on-site
              check-ins, significantly enhancing the overall event
              experience.
            </p>
            <img
              style={{
                width: '45%',
                borderRadius: 5,
              }}
              src={Webexpo2}
              alt=""
            />
          </div>
          <div className="flex justify-center items-center mt-12">
            <a
              href="https://webexpo-dz.com/"
              target="_blank"
              rel="noreferrer"
              className="bg-[#115bef] py-2 px-4 hover:bg-[#3472ed] transition-all ease-linear"
            >
              View Webexpo
            </a>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                My Tech Skills
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-12">
            <div className="flex flex-col items-center gap-2 group">
              <div className="bg-muted rounded-md flex items-center justify-center p-4 w-20 h-20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ReactIcon className="w-8 h-8 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                React
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="bg-muted rounded-md flex items-center justify-center p-4 w-20 h-20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <NextIcon className="w-8 h-8 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                Next js
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="bg-muted rounded-md flex items-center justify-center p-4 w-20 h-20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <WindIcon className="w-8 h-8 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                Tailwind CSS
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="bg-muted rounded-md flex items-center justify-center p-4 w-20 h-20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <NodeIcon className="w-8 h-8 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                Node js
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="bg-muted rounded-md flex items-center justify-center p-4 w-20 h-20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <DatabaseIcon className="w-8 h-8 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                MongoDB
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="bg-muted rounded-md flex items-center justify-center p-4 w-20 h-20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <DatabaseIcon className="w-8 h-8 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                MySQL
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="bg-muted rounded-md flex items-center justify-center p-4 w-20 h-20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <GitGraphIcon className="w-8 h-8 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                Git
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="bg-muted rounded-md flex items-center justify-center p-4 w-20 h-20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <LaravelIcon className="w-8 h-8 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                Laravel
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="bg-muted rounded-md flex items-center justify-center p-4 w-20 h-20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <CloudIcon className="w-8 h-8 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                AWS
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="bg-muted rounded-md flex items-center justify-center p-4 w-20 h-20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ReactIcon className="w-8 h-8 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                React Native
              </span>
            </div>
          </div>
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

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        'rounded-3xl h-full w-full p-4 overflow-hidden bg-[#32353a] border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return (
    <h4
      className={cn(
        'text-zinc-100 font-bold tracking-wide mt-4',
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        'mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm',
        className
      )}
    >
      {children}
    </p>
  );
};

function CloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}
function LaravelIcon(props) {
  return (
    // <svg
    //   {...props}
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="24"
    //   height="24"
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   stroke="currentColor"
    //   strokeWidth="2"
    //   strokeLinecap="round"
    //   strokeLinejoin="round"
    // >
    //   <path d="M4 3H20v18H4V3z" />
    //   <path d="M6 5h12l-6 8-6-8z" />
    //   <path d="M6 19h12l-6-8-6 8z" />
    // </svg>
    <svg
      {...props}
      height="2500"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 -.11376601 49.74245785 51.31690859"
      width="2418"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1 -.402.694l-9.209 5.302v10.509c0 .286-.152.55-.4.694l-19.223 11.066c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1 -.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054l-19.219-11.066a.801.801 0 0 1 -.402-.694v-32.916c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216zm-36.84-31.068v31.068l17.618 10.143v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-21.483l-4.645-2.676-3.363-1.934zm8.81-5.994-8.007 4.609 8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764 4.645-2.674v-20.096l-3.363 1.936-4.646 2.675v20.096zm24.667-23.325-8.006 4.609 8.006 4.609 8.005-4.61zm-.801 10.605-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937zm-18.422 20.561 11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833z"
        fill="#ff2d20"
      />
    </svg>
  );
}
function ReactIcon(props) {
  return (
    <svg
      {...props}
      height="2500"
      viewBox="175.7 78 490.6 436.9"
      width="2194"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#fff">
        <path d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z" />
        <circle cx="420.9" cy="296.5" r="45.7" />
      </g>
    </svg>
  );
}
function NodeIcon(props) {
  return (
    <svg
      {...props}
      height="2500"
      viewBox="3.58301931 1.90851839 24.83198069 28.09192829"
      width="2029"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#fff">
        <path d="m16 30a2.151 2.151 0 0 1 -1.076-.288l-3.424-2.027c-.511-.286-.262-.387-.093-.446a6.828 6.828 0 0 0 1.549-.7.263.263 0 0 1 .255.019l2.631 1.563a.34.34 0 0 0 .318 0l10.26-5.922a.323.323 0 0 0 .157-.278v-11.846a.331.331 0 0 0 -.159-.283l-10.26-5.917a.323.323 0 0 0 -.317 0l-10.254 5.919a.33.33 0 0 0 -.162.281v11.841a.315.315 0 0 0 .161.274l2.814 1.624c1.525.762 2.459-.136 2.459-1.038v-11.691a.3.3 0 0 1 .3-.3h1.3a.3.3 0 0 1 .3.3v11.692c0 2.035-1.108 3.2-3.038 3.2a4.389 4.389 0 0 1 -2.363-.642l-2.697-1.547a2.166 2.166 0 0 1 -1.076-1.872v-11.841a2.162 2.162 0 0 1 1.076-1.875l10.261-5.924a2.246 2.246 0 0 1 2.156 0l10.26 5.924a2.165 2.165 0 0 1 1.077 1.87v11.846a2.171 2.171 0 0 1 -1.077 1.872l-10.26 5.924a2.152 2.152 0 0 1 -1.078.288z" />
        <path d="m14.054 17.953a.3.3 0 0 1 .3-.3h1.327a.3.3 0 0 1 .295.251c.2 1.351.8 2.032 3.513 2.032 2.161 0 3.082-.489 3.082-1.636 0-.661-.261-1.152-3.62-1.481-2.808-.278-4.544-.9-4.544-3.144 0-2.07 1.745-3.305 4.67-3.305 3.287 0 4.914 1.141 5.12 3.589a.3.3 0 0 1 -.295.323h-1.336a.3.3 0 0 1 -.288-.232c-.319-1.421-1.1-1.875-3.2-1.875-2.36 0-2.634.822-2.634 1.438 0 .746.324.964 3.51 1.385 3.153.417 4.651 1.007 4.651 3.223 0 2.236-1.864 3.516-5.115 3.516-4.495.006-5.436-2.055-5.436-3.784z" />
      </g>
    </svg>
  );
}
function NextIcon(props) {
  return (
    <svg
      {...props}
      height="1024pt"
      viewBox=".5 -.2 1023 1024.1"
      fill="#fff"
      width="1024pt"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4 309.4c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z" />
      <path d="m784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z" />
    </svg>
  );
}

function DatabaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function GitGraphIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="5" cy="6" r="3" />
      <path d="M5 9v6" />
      <circle cx="5" cy="18" r="3" />
      <path d="M12 3v18" />
      <circle cx="19" cy="6" r="3" />
      <path d="M16 15.7A9 9 0 0 0 19 9" />
    </svg>
  );
}

function WindIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}

export default Home;
