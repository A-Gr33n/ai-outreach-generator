import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Account() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
      } else {
        setUser({
          email: data.user.email,
          plan: "free", // temp
        });
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleManageSubscription = async () => {
    try {
      // 🔥 use Supabase user instead of localStorage
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        return alert("Not logged in");
      }

      const res = await fetch("/api/customer-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.user.id,
        }),
      });

      const resData = await res.json();
      window.location.href = resData.url;

    } catch (err) {
      console.error(err);
      alert("Error opening billing portal");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Account</h1>

        <p style={styles.text}>
          <strong>Email:</strong> {user.email}
        </p>

        <p style={styles.text}>
          <strong>Plan:</strong>{" "}
          <span style={styles.plan}>{user.plan}</span>
        </p>

        <button
          style={styles.button}
          onClick={() => router.push("/pricing")}
        >
          Upgrade Plan
        </button>

        <button style={styles.manageBtn} onClick={handleManageSubscription}>
          Manage Subscription
        </button>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "300px",
  },

  title: {
    marginBottom: "20px",
  },

  text: {
    marginBottom: "10px",
  },

  plan: {
    background: "#10b981",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "12px",
  },

  button: {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #4b4ded, #7a5cff)",
    color: "#fff",
    cursor: "pointer",
  },

  manageBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#6366f1",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  logoutBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};