// npm imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import TermsOfService from './pages/TermsOfService';
import Privacy from './pages/Privacy';

// Components
import ThemeToggleButton from './components/ThemeSwitchButton';
import NavigationBar from './components/NavigationBar';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeToggleButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tos" element={<TermsOfService />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/post/:id/:index?" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NavigationBar/>
    </Router>
  );
};

export default App;
