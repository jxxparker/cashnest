// Login form and logic
const loginForm = document.createElement("form");
loginForm.innerHTML = `
  <h2>Login</h2>
  <input name="email" type="email" placeholder="Email" required />
  <input name="password" type="password" placeholder="Password" required />
  <button type="submit">Login</button>
  <div id="login-error" style="color:red"></div>
`;
loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.reload();
  } else {
    document.getElementById("login-error").textContent =
      data.error || "Login failed";
  }
};
document.getElementById("auth-root").appendChild(loginForm);
