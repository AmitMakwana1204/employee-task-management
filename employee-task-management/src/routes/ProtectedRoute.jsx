import {
  Navigate,
  useLocation,
} from "react-router-dom";

function ProtectedRoute({
  children,
}) {

  const token =
    localStorage.getItem(
      "token"
    );

  const location =
    useLocation();

  // ================= NOT LOGGED IN =================

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // ================= AUTHORIZED =================

  return children;
}

export default ProtectedRoute;