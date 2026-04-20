import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Parse user role from localStorage
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? (() => { try { return JSON.parse(rawUser); } catch { return null; } })() : null;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: "Registration Required",
        text: "Please register or return home to continue.",
        icon: "info",

        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: true,

        showConfirmButton: true,
        showDenyButton: true,
        showCancelButton: false,

        confirmButtonText: "Register",
        denyButtonText: "Back to Home",

        confirmButtonColor: "#003366",
        denyButtonColor: "#d3d3df",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup");
        } else if (result.isDenied) {
          navigate("/");
        }
      });
      return;
    }

    if (adminOnly && !isAdmin) {
      Swal.fire({
        title: "Access Denied",
        text: "You do not have permission to access the admin area.",
        icon: "error",
        confirmButtonColor: "#003366",
      }).then(() => navigate("/"));
    }
  }, [token, navigate, adminOnly, isAdmin]);

  if (!token) return null;
  if (adminOnly && !isAdmin) return null;

  return children;
};

export default ProtectedRoute;
