import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Success() {
  const router = useRouter();
  const { plan } = router.query;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!plan) return;

    const updatePlan = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        router.push("/login");
        return;
      }

      // ✅ UPDATE DATABASE (THIS is what was missing)
      await supabase
        .from("users")
        .update({ plan })
        .eq("id", data.user.id);

      setLoading(false);
    };

    updatePlan();
  }, [plan]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Updating your plan...</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🎉 Payment Successful</h1>
        <p>Your subscription is now active.</p>
        <p><strong>Plan: {plan?.toUpperCase()}</strong></p>

        <button style={styles.button} onClick={() => router.push("/")}>
          Go to Dashboard
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
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    background: "#6c63ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};