import CelebrationDemo from './components/celebration_demo/celebration_demo.component.tsx';
import Form from './components/form/form.component.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/redeem/demo" element={<CelebrationDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
