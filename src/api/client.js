const URL_BASE = "http://localhost:3001/api-docs/#/User Module/";
export async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/post_user_login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await.response.json();

  if(!response.ok) {
    const msg = data?.message
  }
}
