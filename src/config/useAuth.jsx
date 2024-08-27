import { useState, useEffect, useContext, createContext } from "react";
import supabase from "./supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data: { session } = {} } = await supabase.auth.getSession();
        console.log("session", session?.user?.user_metadata);
        setUser(session?.user ?? null);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
