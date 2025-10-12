"use client";
import { useState } from "react";
import { AuthAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!userName.trim() || !emailId.trim() || !password.trim() || !mobileNumber.trim()) {
      setError("All fields are required");
      return;
    }
    try {
      await AuthAPI.signup({ userName, emailId, password, mobileNumber });
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full border rounded p-2" placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Email" value={emailId} onChange={e => setEmailId(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Mobile Number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
        <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-black text-white px-4 py-2 rounded" type="submit">Create account</button>
      </form>
    </div>
  );
}


