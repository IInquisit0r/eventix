import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventPage from "./blocks/event-page/event-page";
import Footer from "./blocks/footer/footer";
import "./css/global.css";

export default function App() {
  return (
    <BrowserRouter basename="/eventix">
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