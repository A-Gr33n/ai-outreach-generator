import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [form, setForm] = useState({ email: "" });

const handleLogin = () => {
  
console.log("BUTTON CLICKED");
  // Example (replace with your actual login logic)
  const email = form.email;

  const user = {
    email: email,
    plan: "free", // default plan
  };

  localStorage.setItem("user", JSON.stringify(user));

  router.push("/"); // redirect after login
};


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>Login / Register</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Enter email"
        value={form.email}
        onChange={(e) => setForm({ email: e.target.value })}
      />

        <button onClick={handleLogin} type="submit" style={styles.button}>
          Continue
        </button>

    </form>

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
    borderRadius: "12px",
    textAlign: "center",
  },
  input: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
  },
};