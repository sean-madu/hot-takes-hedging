// npm imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Post from './pages/Post';

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
          <Route path="/post/:id/:index?" element={<Post />} />
        </Routes>
    </Router>
  );
};

export default App;
