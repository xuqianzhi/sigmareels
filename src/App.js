import LandingPage from './components/landing/landing.component.tsx';
import RedeemLanding from './components/landing/redeem_landing.component.tsx';
import CelebrationMain from './components/celebration/celebration_main.component.tsx';
import Form from './components/form/form.component.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customize" element={<Form />} />
        <Route path="/redeem" element={<RedeemLanding />} />
        <Route path="/redeem/:redeemId" element={<CelebrationMain />} />
        <Route path="/demo" element={<CelebrationMain />} />
      </Routes>
    </Router>
  );
}

export default App;
