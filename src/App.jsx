import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import SignToText from "./pages/signToText/SignToText";
import TextToSign from "./pages/textToSign/TextToSign";
import Learning from "./pages/learning/Learning";
import Letters from "./components/learningCategory/Letters";
import Colors from "./components/learningCategory/Colors";
import Numbers from "./components/learningCategory/Numbers";
import Sentences from "./components/learningCategory/Sentences";
import Quiz from "./pages/quiz/Quiz";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learning/letters" element={<Letters />} />
          <Route path="/learning/colors" element={<Colors />} />
          <Route path="/learning/numbers" element={<Numbers />} />
          <Route path="/learning/sentences" element={<Sentences />} />
          <Route path="/learning/:category/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
