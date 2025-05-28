// npm imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Components
import ThemeToggleButton from './components/ThemeSwitchButton';

const App: React.FC = () => {

  return (
    <Router>
      <ThemeToggleButton/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
};

export default App;
