import Typical from 'react-typical';

const AppLoading = () => {
  return (
    <div className="page-loading">
      <h1>
        I'm{' '}
        <Typical
          wrapper="b"
          steps={[
            'a Full Stack dev',
            500,
            'a Hardworker',
            500,
            'Raouf Allala',
            500,
          ]}
        />
      </h1>
    </div>
  );
};

export default AppLoading;
