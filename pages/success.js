import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Success() {
  const router = useRouter();
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const updatePlan = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      // ✅ get plan from URL (passed from Stripe)
      const selectedPlan = router.query.plan || "pro";

      setPlan(selectedPlan);

      // ✅ update DB (THIS is what makes it persist)
      const { error } = await supabase
        .from("users")
        .update({ plan: selectedPlan })
        .eq("id", data.user.id);

      if (error) {
        console.error("Error updating plan:", error);
      }

      // redirect after short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    };

    if (router.isReady) {
      updatePlan();
    }
  }, [router.isReady]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🎉 Payment Successful</h1>
        <p>Your subscription has been activated.</p>

        <p>
          <strong>Current Plan: {plan.toUpperCase()}</strong>
        </p>

        <button style={styles.button} onClick={() => router.push("/")}>
          Go Back to Generator
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
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  button: {
    marginTop: "20px",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #5f6afc, #6c63ff)",
    color: "#fff",
    cursor: "pointer",
  },
};