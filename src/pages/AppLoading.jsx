import Typewriter from 'typewriter-effect';
const AppLoading = () => {
  return (
    <div className="page-loading">
      <h1 className="p-events-non">
        I'm
        <Typewriter
          options={{
            strings: [
              'A Full-stack web dev',
              'A hardworker',
              'Raouf Allala',
            ],
            delay: 30,
            deleteSpeed: 30,
            pauseFor: 1000,
            autoStart: true,
          }}
        />
      </h1>
    </div>
  );
};

export default AppLoading;
