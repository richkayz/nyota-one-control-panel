"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Business = {
  id: number;
  name: string;
  legalName?: string | null;
  category?: string | null;
  description?: string | null;
  tagline?: string | null;
  country?: string | null;
  city?: string | null;
  region?: string | null;
  timezone?: string | null;
  currency?: string | null;
  language?: string | null;
  registrationNumber?: string | null;
  taxNumber?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  website?: string | null;
  address?: string | null;
  logo?: string | null;
  coverImage?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function BusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBusiness() {
      try {
        const { id } = await params;

        const response = await fetch(`/api/businesses/${id}`);

        if (!response.ok) {
          throw new Error("Business not found");
        }

        const data = await response.json();
        setBusiness(data);
      } catch {
        setError("Unable to load this business.");
      } finally {
        setLoading(false);
      }
    }

    loadBusiness();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <p className="text-slate-400">Loading business profile...</p>
      </main>
    );
  }

  if (error || !business) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <Link
          href="/"
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          ← Back to dashboard
        </Link>

        <div className="mt-10 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
          <h1 className="text-xl font-semibold">Business not found</h1>
          <p className="mt-2 text-slate-400">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="text-sm text-blue-400 transition hover:text-blue-300"
        >
          ← Back to dashboard
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
          <div className="h-32 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 sm:h-44" />

          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-slate-900 bg-slate-800 text-3xl font-bold text-blue-400 shadow-xl sm:h-28 sm:w-28">
                  {business.logo ? (
                    <img
                      src={business.logo}
                      alt={`${business.name} logo`}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    business.name.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="pb-1">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    {business.name}
                  </h1>

                  <p className="mt-1 text-sm text-slate-400">
                    {business.category || "Business profile"}
                  </p>
                </div>
              </div>

              <span className="w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                {business.status}
              </span>
            </div>

            {business.tagline && (
              <p className="mt-6 max-w-3xl text-slate-300">
                {business.tagline}
              </p>
            )}

            {business.description && (
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                {business.description}
              </p>
            )}
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Business information</h2>
              <span className="text-xs text-slate-500">Profile</span>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Info label="Legal name" value={business.legalName} />
              <Info label="Business category" value={business.category} />
              <Info label="Country" value={business.country} />
              <Info label="City" value={business.city} />
              <Info label="Region" value={business.region} />
              <Info label="Address" value={business.address} />
              <Info
                label="Registration number"
                value={business.registrationNumber}
              />
              <Info label="Tax number" value={business.taxNumber} />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold">Contact details</h2>

            <div className="mt-5 space-y-4">
              <Info label="Email" value={business.email} />
              <Info label="Phone" value={business.phone} />
              <Info label="WhatsApp" value={business.whatsapp} />
              <Info label="Website" value={business.website} />
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          <FeatureCard
            title="Websites"
            description="Create and manage business websites."
          />

          <FeatureCard
            title="Hosting and email"
            description="Manage hosting, domains and business email."
          />

          <FeatureCard
            title="Branding"
            description="Manage logos, colours and brand assets."
          />
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Business profile settings</h2>

          <p className="mt-2 text-sm text-slate-400">
            More profile management features will be added here, including
            locations, contacts, services, documents and logo requests.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              disabled
              className="rounded-xl bg-blue-600/40 px-4 py-2 text-sm text-blue-200"
            >
              Edit profile — Coming next
            </button>

            <button
              disabled
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-500"
            >
              Request logo — Coming next
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm text-slate-200">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        ✦
      </div>

      <h2 className="mt-4 font-semibold">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>

      <button
        disabled
        className="mt-5 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-500"
      >
        Coming next
      </button>
    </div>
  );
}