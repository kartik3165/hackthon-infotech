import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import OngoingProjects from './pages/OngoingProjects';
import ProjectDetail from './pages/ProjectDetail';
import CompletedProjects from './pages/CompletedProjects';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
import EMICalculator from './pages/EMICalculator';
import Brochure from './pages/Brochure';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ongoing-projects" element={<OngoingProjects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/completed-projects" element={<CompletedProjects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/location" element={<Location />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/brochure" element={<Brochure />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
