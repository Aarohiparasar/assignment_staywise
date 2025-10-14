const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
import axios from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiFetch<T>(path: string, options: { method?: HttpMethod; body?: any; auth?: boolean } = {}): Promise<T> {
  const { method = "GET", body, auth = false } = options;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`API Error ${res.status}:`, text);
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export const AuthAPI = {
  signup: (data: { userName: string; emailId: string; password: string; mobileNumber: string; role?: "user" | "admin" }) =>
    apiFetch<{ status: string; message: string; user: { id: string; userName: string; emailId: string } }>(
      "/api/users/signUp",
      { method: "POST", body: data }
    ),
  login: (data: { emailId: string; password: string }) =>
    apiFetch<{ token: string; id: string }>("/api/users/login", { method: "POST", body: data }),
  profile: (id: string) => apiFetch<{ userName: string; emailId: string; mobileNumber: string }>(`/api/users/profile/${id}`, { auth: true }),
};

export const PropertyAPI = {
  list: () => apiFetch<{ status: string; data: any[] }>("/api/properties"),
  get: (id: string) => apiFetch<{ status: string; data: any }>(`/api/properties/${id}`),
};

export const BookingAPI = {
  create: (data: { propertyId: string; checkIn: string; checkOut: string }) => apiFetch<{ status: string; data: any }>("/api/bookings", { method: "POST", body: data, auth: true }),

  mine: () => apiFetch<{ status: string; data: any[] }>("/api/bookings/me", { auth: true }),

   cancel: async (bookingId: string) => {
    
    const token = localStorage.getItem("token"); // or however you store it
    console.log(token)

    const res = await fetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // required by authMiddleware
      },
    });    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to cancel booking");
    }
    return res.json();
  },
};


