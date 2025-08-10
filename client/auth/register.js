// Register form and logic
const registerForm = document.createElement("form");
registerForm.innerHTML = `
  <h2>Register</h2>
  <input name="email" type="email" placeholder="Email" required />
  <input name="password" type="password" placeholder="Password" required />
  <button type="submit">Register</button>
  <div id="register-error" style="color:red"></div>
`;
registerForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = registerForm.email.value;
  const password = registerForm.password.value;
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (data.message) {
    alert("Registration successful! Please log in.");
    window.location.reload();
  } else {
    document.getElementById("register-error").textContent =
      data.error || "Registration failed";
  }
};
document.getElementById("auth-root").appendChild(registerForm);
