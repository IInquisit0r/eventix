import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}