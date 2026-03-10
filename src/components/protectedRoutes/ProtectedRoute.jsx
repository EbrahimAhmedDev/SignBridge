import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
