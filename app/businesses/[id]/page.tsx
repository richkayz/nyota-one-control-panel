"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Business = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  logo: string | null;
  createdAt: string;
};

export default function BusinessDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadBusiness() {
      try {
        const { id } = await params;

        const response = await fetch(`/api/businesses/${id}`);

        if (!response.ok) {
          throw new Error("Business not found");
        }

        const data: Business = await response.json();
        setBusiness(data);
      } catch {
        setErrorMessage("Unable to load this business.");
      } finally {
        setLoading(false);
      }
    }

    loadBusiness();
  }, [params]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <p className="text-sm text-slate-400">Loading business...</p>
      </main>
    );
  }

  if (!business) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Business not found</h1>
          <p className="mt-2 text-sm text-slate-400">{errorMessage}</p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-6 text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              ← Back to dashboard
            </Link>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Business workspace
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {business.name}
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage this business account from one place.
            </p>
          </div>

          <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            Active account
          </div>
        </div>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">Websites</p>
            <p className="mt-3 text-3xl font-semibold">0</p>
            <p className="mt-2 text-sm text-slate-400">
              Websites connected
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">Hosting</p>
            <p className="mt-3 text-3xl font-semibold">0</p>
            <p className="mt-2 text-sm text-slate-400">
              Hosting services
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">Projects</p>
            <p className="mt-3 text-3xl font-semibold">0</p>
            <p className="mt-2 text-sm text-slate-400">
              Active projects
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Business information</h2>
              <p className="mt-1 text-sm text-slate-400">
                Basic information for this account.
              </p>
            </div>

            <span className="rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-400">
              ID: {business.id}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Business name
              </p>
              <p className="mt-2 text-sm font-medium">{business.name}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Email address
              </p>
              <p className="mt-2 text-sm font-medium">
                {business.email || "No email provided"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Phone number
              </p>
              <p className="mt-2 text-sm font-medium">
                {business.phone || "No phone provided"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Created
              </p>
              <p className="mt-2 text-sm font-medium">
                {new Date(business.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">Website management</h2>
            <p className="mt-2 text-sm text-slate-400">
              Websites and online presence for this business will appear here.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 cursor-not-allowed rounded-xl bg-slate-800 px-4 py-3 text-sm text-slate-500"
            >
              Coming next
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">Hosting and email</h2>
            <p className="mt-2 text-sm text-slate-400">
              Hosting, domains, and business email services will appear here.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 cursor-not-allowed rounded-xl bg-slate-800 px-4 py-3 text-sm text-slate-500"
            >
              Coming next
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}