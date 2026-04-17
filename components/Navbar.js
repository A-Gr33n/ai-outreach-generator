import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Get current user
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    // ✅ Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
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
        <button style={styles.navBtn} onClick={() => router.push("/")}>
          Home
        </button>

        <button style={styles.navBtn} onClick={() => router.push("/pricing")}>
          Pricing
        </button>

        <button style={styles.navBtn} onClick={() => router.push("/how-to-use")}>
          How to use
        </button>

        {user && (
          <button style={styles.navBtn} onClick={() => router.push("/account")}>
            Account
          </button>
        )}

        {!user ? (
          <button style={styles.loginBtn} onClick={() => router.push("/login")}>
            Login
          </button>
        ) : (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}