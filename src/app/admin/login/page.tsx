"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/language-context";
import { Auto24Logo } from "@/components/ui/Auto24Logo";

export default function AdminLoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || t.admin.invalidCredentials);
      }
    } catch {
      setError(t.admin.loginFailed);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Auto24Logo height={44} color="#185ADB" />
          </div>
          <h1 className="text-xl font-bold text-neutral-dark">{t.admin.loginTitle}</h1>
          <p className="text-sm text-neutral-medium">{t.admin.loginSubtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-card p-6 space-y-4">
          <div className="form-field">
            <Label>{t.admin.email}</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@auto24.africa"
              required
            />
          </div>

          <div className="form-field">
            <Label>{t.admin.password}</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.admin.enterPassword}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-error bg-error/10 p-2 rounded-lg">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t.admin.signingIn : t.admin.signIn}
          </Button>
        </form>
      </div>
    </div>
  );
}
