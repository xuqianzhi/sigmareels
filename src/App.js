import RedeemLanding from "./components/landing/redeem_landing.component.tsx";
import CelebrationPreview from "./components/celebration/celebration_wrapper_preview.component.tsx";
import CelebrationRedeem from "./components/celebration/celebration_wrapper_redeem.component.tsx";
import CelebrationMain from "./components/celebration/celebration_main.component.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedeemLanding />} />
        <Route path="/preview" element={<CelebrationPreview />} />
        <Route path="/redeem/:orderId" element={<CelebrationRedeem />} />
        <Route path="/demo" element={<CelebrationMain
        recipientName={"ReeSiPoo"}
        customerName={"Jack Daniels"}
        occasion={"Birthday"}
        relationship={"Friend"}
        message={"Hey ReeSiPoo, you're the best, we all love you! Mua!"}
      />} />
      </Routes>
    </Router>
  );
}

export default App;
