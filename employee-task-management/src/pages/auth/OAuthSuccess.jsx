import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import api from "../../services/api";

/**
 * OAuthSuccess — Landing page after Google OAuth redirect
 * Backend redirects here: /oauth-success?token=...&userId=...
 * This page stores the token, fetches user data, and redirects to dashboard.
 */
function OAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const processOAuth = async () => {
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (error || !token) {
        toast.error("Google sign-in failed. Please try again.");
        navigate("/login");
        return;
      }

      try {
        // Fetch user info using the token
        const response = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data.user;
        login(user, token);

        toast.success(`Welcome, ${user.name}! 👋`);
        navigate("/dashboard");
      } catch (err) {
        console.error("OAuthSuccess Error:", err);
        toast.error("Could not complete sign-in. Please try again.");
        navigate("/login");
      }
    };

    processOAuth();
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-600 font-medium text-lg">
          Signing you in with Google…
        </p>
        <p className="text-gray-400 text-sm">Please wait a moment</p>
      </div>
    </div>
  );
}

export default OAuthSuccess;
