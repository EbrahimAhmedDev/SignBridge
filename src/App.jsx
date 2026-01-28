import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import SignToText from "./pages/signToText/SignToText";
import TextToSign from "./pages/textToSign/TextToSign";
import Learning from "./pages/learning/Learning";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-to-text" element={<SignToText />} />
          <Route path="/text-to-sign" element={<TextToSign />} />
          <Route path="/learning" element={<Learning />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
