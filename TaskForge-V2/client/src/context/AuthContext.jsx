import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error("Invalid saved user:", error);
        localStorage.removeItem("user");
      }
    }

    return null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      // No token = not logged in
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile();

        if (response?.user) {
          setUser(response.user);

          localStorage.setItem(
            "user",
            JSON.stringify(response.user)
          );
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);

        // Only clear authentication if the token is actually invalid
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};