const BASE_URL = "http://localhost:3001/api/v1";

export async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    const msg = data?.message || "Identifiants invalides";
    throw new Error(msg);
  }
  return { token: data.body.token };
}

export async function getProfile(token) {
  const response = await fetch(`${BASE_URL}/user/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    const msg = data?.message || "Session invalide";
    throw new Error(msg);
  }
  return data.body;
}

export async function updateUserName(token, userName) {
  const response = await fetch(`${BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userName }),
  });
  const data = await response.json();

  if (!response.ok) {
    const msg = data?.message || `${response.status} ${response.statusText}`;
    throw new Error(msg);
  }
  return data.body;
}
