import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import AdCreative from './pages/AdCreative';
import StoreDev from './pages/StoreDev';
import CompetitorAnalysis from './pages/CompetitorAnalysis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ad-creative" element={<AdCreative />} />
          <Route path="/store-dev" element={<StoreDev />} />
          <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
