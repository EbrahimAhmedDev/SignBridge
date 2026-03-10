import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import SignToText from "./pages/signToText/SignToText";
import TextToSign from "./pages/textToSign/TextToSign";
import Learning from "./pages/learning/Learning";
import Quiz from "./pages/quiz/Quiz";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import LearningCategory from "./components/learningCategory/LearningCategory";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
import NotFound from "./pages/nouFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-to-text" element={<SignToText />} />
          <Route path="/text-to-sign" element={<TextToSign />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/learning/:id"
            element={
              <ProtectedRoute>
                <LearningCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning/:id/quiz"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
