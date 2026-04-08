import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>AI Outreach</h2>

      <div style={styles.links}>
        <button onClick={() => router.push("/")}>Home</button>
        <button onClick={() => router.push("/pricing")}>Pricing</button>
        <button onClick={() => router.push("/how-to-use")}>How to use</button>
        <button onClick={() => router.push("/account")}>Account</button>

        {user ? (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button style={styles.loginBtn} onClick={() => router.push("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    background: "#fff",
    borderBottom: "1px solid #eee",
  },
  logo: { fontWeight: "700" },
  links: { display: "flex", gap: "10px" },

  loginBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#4b4ded",
    color: "#fff",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },
};