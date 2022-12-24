import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AppLoading from './pages/AppLoading';
import Header from './pages/Header';
import Home from './pages/Home';
function App() {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 6000);
  }, []);
  return (
    <div className="App">
      <Helmet>
        <title>Raouf.</title>
      </Helmet>
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <Header />
            <Home />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <AppLoading />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
