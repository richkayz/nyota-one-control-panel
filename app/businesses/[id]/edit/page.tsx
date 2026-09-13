"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type BusinessForm = {
  name: string;
  legalName: string;
  category: string;
  tagline: string;
  description: string;
  country: string;
  city: string;
  region: string;
  address: string;
  registrationNumber: string;
  taxNumber: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  logo: string;
  coverImage: string;
  brandColors: string;
  brandGuidelines: string;
};

const emptyForm: BusinessForm = {
  name: "",
  legalName: "",
  category: "",
  tagline: "",
  description: "",
  country: "Uganda",
  city: "",
  region: "",
  address: "",
  registrationNumber: "",
  taxNumber: "",
  email: "",
  phone: "",
  whatsapp: "",
  website: "",
  logo: "",
  coverImage: "",
  brandColors: "",
  brandGuidelines: "",
};

export default function EditBusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [businessId, setBusinessId] = useState("");
  const [form, setForm] = useState<BusinessForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBusiness() {
      try {
        const { id } = await params;

        setBusinessId(id);

        const response = await fetch(`/api/businesses/${id}`);

        if (!response.ok) {
          throw new Error("Business not found");
        }

        const business = await response.json();

        setForm({
          name: business.name || "",
          legalName: business.legalName || "",
          category: business.category || "",
          tagline: business.tagline || "",
          description: business.description || "",
          country: business.country || "Uganda",
          city: business.city || "",
          region: business.region || "",
          address: business.address || "",
          registrationNumber: business.registrationNumber || "",
          taxNumber: business.taxNumber || "",
          email: business.email || "",
          phone: business.phone || "",
          whatsapp: business.whatsapp || "",
          website: business.website || "",
          logo: business.logo || "",
          coverImage: business.coverImage || "",
          brandColors: business.brandColors || "",
          brandGuidelines: business.brandGuidelines || "",
        });
      } catch {
        setError("Unable to load this business.");
      } finally {
        setLoading(false);
      }
    }

    loadBusiness();
  }, [params]);

  function updateField(field: keyof BusinessForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/businesses/${businessId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      setMessage("Business profile saved successfully.");
    } catch {
      setError("Unable to save the business profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <p className="text-slate-400">Loading business profile...</p>
      </main>
    );
  }

  if (error && !businessId) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/businesses/${businessId}`}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          ← Back to business profile
        </Link>

        <div className="mt-6">
          <p className="text-sm font-medium text-blue-400">
            BUSINESS SETTINGS
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Edit business profile
          </h1>

          <p className="mt-2 text-slate-400">
            Keep your business information accurate and up to date.
          </p>
        </div>

        <form onSubmit={saveProfile} className="mt-8 space-y-6">
          <ProfileSection
            title="Business identity"
            description="Basic information customers should know about your business."
          >
            <Input
              label="Business name"
              value={form.name}
              required
              onChange={(value) => updateField("name", value)}
            />

            <Input
              label="Legal name"
              value={form.legalName}
              onChange={(value) => updateField("legalName", value)}
            />

            <Input
              label="Business category"
              value={form.category}
              placeholder="e.g. Digital solutions"
              onChange={(value) => updateField("category", value)}
            />

            <Input
              label="Tagline"
              value={form.tagline}
              placeholder="Your short business statement"
              onChange={(value) => updateField("tagline", value)}
            />

            <TextArea
              label="Business description"
              value={form.description}
              onChange={(value) => updateField("description", value)}
            />
          </ProfileSection>

          <ProfileSection
            title="Location and registration"
            description="Where your business operates and its official details."
          >
            <Input
              label="Country"
              value={form.country}
              onChange={(value) => updateField("country", value)}
            />

            <Input
              label="City"
              value={form.city}
              onChange={(value) => updateField("city", value)}
            />

            <Input
              label="Region / State"
              value={form.region}
              onChange={(value) => updateField("region", value)}
            />

            <Input
              label="Business address"
              value={form.address}
              onChange={(value) => updateField("address", value)}
            />

            <Input
              label="Registration number"
              value={form.registrationNumber}
              onChange={(value) =>
                updateField("registrationNumber", value)
              }
            />

            <Input
              label="Tax number"
              value={form.taxNumber}
              onChange={(value) => updateField("taxNumber", value)}
            />
          </ProfileSection>

          <ProfileSection
            title="Contact information"
            description="How customers and partners can reach your business."
          >
            <Input
              label="Business email"
              inputType="email"
              value={form.email}
              onChange={(value) => updateField("email", value)}
            />

            <Input
              label="Phone number"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
            />

            <Input
              label="WhatsApp number"
              value={form.whatsapp}
              onChange={(value) => updateField("whatsapp", value)}
            />

            <Input
              label="Website"
              value={form.website}
              placeholder="https://example.com"
              onChange={(value) => updateField("website", value)}
            />
          </ProfileSection>

          <ProfileSection
            title="Branding"
            description="Add your logo, cover image and brand information."
          >
            <Input
              label="Logo URL"
              value={form.logo}
              placeholder="https://..."
              onChange={(value) => updateField("logo", value)}
            />

            <Input
              label="Cover image URL"
              value={form.coverImage}
              placeholder="https://..."
              onChange={(value) => updateField("coverImage", value)}
            />

            <Input
              label="Brand colours"
              value={form.brandColors}
              placeholder="e.g. navy, blue, green"
              onChange={(value) => updateField("brandColors", value)}
            />

            <TextArea
              label="Brand guidelines"
              value={form.brandGuidelines}
              onChange={(value) => updateField("brandGuidelines", value)}
            />
          </ProfileSection>

          {message && (
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving profile..." : "Save profile"}
            </button>

            <Link
              href={`/businesses/${businessId}`}
              className="rounded-xl border border-white/10 px-6 py-3 text-sm text-slate-300 transition hover:bg-white/5"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

function ProfileSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-6">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="mt-1 text-sm text-slate-400">{description}</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  inputType = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputType?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-300">
        {label}
      </span>

      <input
        type={inputType}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-medium text-slate-300">
        {label}
      </span>

      <textarea
        value={value}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
      />
    </label>
  );
}