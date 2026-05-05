import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminModules from "./pages/admin/AdminModules";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSigns from "./pages/admin/AdminSigns";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes — with Navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
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
              </>
            }
          />

          {/* Admin Routes — no Navbar, own sidebar layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="modules" element={<AdminModules />} />
            <Route path="signs" element={<AdminSigns />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
