"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

type Business = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  logo: string | null;
  createdAt: string;
};

const navigation = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Clients", icon: "◉" },
  { name: "Websites", icon: "▣" },
  { name: "Hosting", icon: "◈" },
  { name: "Email", icon: "✉" },
  { name: "Projects", icon: "✓" },
  { name: "Monitoring", icon: "◌" },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loadingBusinesses, setLoadingBusinesses] = useState(true);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [savingBusiness, setSavingBusiness] = useState(false);
  const [businessMessage, setBusinessMessage] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");

  const pageClass = darkMode
    ? "bg-slate-950 text-slate-100"
    : "bg-slate-100 text-slate-900";

  const sidebarClass = darkMode
    ? "bg-slate-950 border-slate-800"
    : "bg-white border-slate-200";

  const cardClass = darkMode
    ? "bg-slate-900 border-slate-800"
    : "bg-white border-slate-200";

  const mutedClass = darkMode ? "text-slate-400" : "text-slate-600";
  const subtleClass = "text-slate-500";
  const borderClass = darkMode ? "border-slate-800" : "border-slate-200";

  useEffect(() => {
    async function loadBusinesses() {
      try {
        const response = await fetch("/api/businesses");

        if (!response.ok) {
          throw new Error("Failed to load businesses");
        }

        const data: Business[] = await response.json();
        setBusinesses(data);
      } catch {
        setBusinessMessage("Unable to load businesses.");
      } finally {
        setLoadingBusinesses(false);
      }
    }

    loadBusinesses();
  }, []);

  async function createBusiness(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!businessName.trim()) {
      setBusinessMessage("Business name is required.");
      return;
    }

    setSavingBusiness(true);
    setBusinessMessage("");

    try {
      const response = await fetch("/api/businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: businessName.trim(),
          email: businessEmail.trim() || null,
          phone: businessPhone.trim() || null,
        }),
      });

      const data: Business | { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "Failed to create business"
        );
      }

      setBusinesses((current) => [data as Business, ...current]);
      setBusinessName("");
      setBusinessEmail("");
      setBusinessPhone("");
      setShowBusinessForm(false);
      setBusinessMessage("Business created successfully.");
    } catch (error) {
      setBusinessMessage(
        error instanceof Error
          ? error.message
          : "Unable to create business."
      );
    } finally {
      setSavingBusiness(false);
    }
  }

  return (
    <div
      className={`flex min-h-screen w-full overflow-x-hidden ${pageClass}`}
    >
      {/* Sidebar */}
      <aside
        className={`hidden w-50 shrink-0 flex-col border-r lg:flex ${sidebarClass}`}
      >
        <div
          className={`flex h-20 items-center border-b px-5 ${borderClass}`}
        >
          <Image
            src="/nyota-one-logo.png"
            alt="Nyota One"
            width={80}
            height={30}
            priority
            className="h-auto w-[70px] object-contain"
          />
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : `${mutedClass} ${
                      darkMode
                        ? "hover:bg-slate-900 hover:text-white"
                        : "hover:bg-slate-100 hover:text-slate-900"
                    }`
              }`}
            >
              <span className="w-5 text-center text-base">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4">
          <div className={`rounded-xl border p-4 ${cardClass}`}>
            <div className={`text-xs ${subtleClass}`}>
              System status
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="min-w-0 flex-1">
        {/* Header */}
        <header
          className={`flex min-h-20 items-center justify-between gap-4 border-b px-5 py-4 sm:px-6 lg:px-8 ${borderClass}`}
        >
          <div className="min-w-0">
            <h1 className="text-lg font-semibold">Dashboard</h1>

            <p className={`mt-1 truncate text-sm ${subtleClass}`}>
              Overview of your Nyota One operations
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                darkMode
                  ? "border-slate-700 text-slate-300 hover:bg-slate-900"
                  : "border-slate-300 text-slate-700 hover:bg-white"
              }`}
            >
              <span>{darkMode ? "☀" : "☾"}</span>

              <span className="ml-2 hidden sm:inline">
                {darkMode ? "Light" : "Dark"}
              </span>
            </button>

            <button
              type="button"
              className={`hidden rounded-lg border px-3 py-2 text-sm transition md:block ${
                darkMode
                  ? "border-slate-700 text-slate-300 hover:bg-slate-900"
                  : "border-slate-300 text-slate-700 hover:bg-white"
              }`}
            >
              Notifications
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              R
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto w-full max-w-7xl p-5 sm:p-6 lg:p-8">
          {/* Welcome */}
          <section className="mb-7">
            <p className={`mb-2 text-sm font-medium ${subtleClass}`}>
              Overview
            </p>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Good evening, Richard
            </h2>

            <p className={`mt-2 text-sm ${mutedClass}`}>
              Here is what is happening across Nyota One.
            </p>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Clients",
                value: businesses.length,
                description: "Registered businesses",
              },
              {
                title: "Websites",
                value: 0,
                description: "Managed websites",
              },
              {
                title: "Projects",
                value: 0,
                description: "Active projects",
              },
              {
                title: "Systems",
                value: 0,
                description: "Monitored systems",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className={`rounded-2xl border p-5 ${cardClass}`}
              >
                <div className={`text-sm font-medium ${subtleClass}`}>
                  {stat.title}
                </div>

                <div className="mt-3 text-3xl font-semibold">
                  {stat.value}
                </div>

                <div className={`mt-1 text-xs ${subtleClass}`}>
                  {stat.description}
                </div>
              </div>
            ))}
          </section>

          {/* Businesses */}
          <section className="mt-6">
            <div className={`rounded-2xl border p-6 ${cardClass}`}>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold">
                    Business accounts
                  </h3>

                  <p className={`mt-1 text-sm ${subtleClass}`}>
                    Manage businesses registered with Nyota One.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowBusinessForm((current) => !current);
                    setBusinessMessage("");
                  }}
                  className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  {showBusinessForm ? "Close form" : "+ Add business"}
                </button>
              </div>

              {businessMessage && (
                <div
                  className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                    businessMessage.includes("successfully")
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  {businessMessage}
                </div>
              )}

              {showBusinessForm && (
                <form
                  onSubmit={createBusiness}
                  className={`mt-6 grid grid-cols-1 gap-4 rounded-xl border p-4 ${borderClass}`}
                >
                  <div>
                    <label
                      htmlFor="businessName"
                      className={`mb-2 block text-sm font-medium ${mutedClass}`}
                    >
                      Business name *
                    </label>

                    <input
                      id="businessName"
                      type="text"
                      value={businessName}
                      onChange={(event) =>
                        setBusinessName(event.target.value)
                      }
                      placeholder="Enter business name"
                      required
                      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-blue-500 ${
                        darkMode
                          ? "border-slate-700 bg-slate-950 text-white"
                          : "border-slate-300 bg-white text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="businessEmail"
                      className={`mb-2 block text-sm font-medium ${mutedClass}`}
                    >
                      Email address
                    </label>

                    <input
                      id="businessEmail"
                      type="email"
                      value={businessEmail}
                      onChange={(event) =>
                        setBusinessEmail(event.target.value)
                      }
                      placeholder="business@example.com"
                      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-blue-500 ${
                        darkMode
                          ? "border-slate-700 bg-slate-950 text-white"
                          : "border-slate-300 bg-white text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="businessPhone"
                      className={`mb-2 block text-sm font-medium ${mutedClass}`}
                    >
                      Phone number
                    </label>

                    <input
                      id="businessPhone"
                      type="tel"
                      value={businessPhone}
                      onChange={(event) =>
                        setBusinessPhone(event.target.value)
                      }
                      placeholder="+256..."
                      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-blue-500 ${
                        darkMode
                          ? "border-slate-700 bg-slate-950 text-white"
                          : "border-slate-300 bg-white text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={savingBusiness}
                      className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {savingBusiness
                        ? "Saving..."
                        : "Save business"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowBusinessForm(false)}
                      className={`rounded-xl border px-5 py-3 text-sm font-medium transition ${
                        darkMode
                          ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                          : "border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6">
                {loadingBusinesses ? (
                  <div className={`py-12 text-center text-sm ${subtleClass}`}>
                    Loading businesses...
                  </div>
                ) : businesses.length === 0 ? (
                  <div
                    className={`rounded-xl border border-dashed p-10 text-center ${borderClass}`}
                  >
                    <p className="text-sm font-medium">
                      No businesses registered yet
                    </p>

                    <p className={`mt-2 text-sm ${subtleClass}`}>
                      Add your first business account to get started.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {businesses.map((business) => (
                      <div
                        key={business.id}
                        className={`rounded-xl border p-4 ${borderClass}`}
                      >
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                          <div>
                            <h4 className="font-semibold">
                              {business.name}
                            </h4>

                            <div className={`mt-1 text-sm ${mutedClass}`}>
                              {business.email || "No email provided"}
                            </div>

                            <div className={`mt-1 text-sm ${subtleClass}`}>
                              {business.phone || "No phone provided"}
                            </div>
                          </div>

                          <div className={`text-xs ${subtleClass}`}>
                            ID: {business.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Main Panels */}
          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div
              className={`min-w-0 rounded-2xl border p-6 xl:col-span-2 ${cardClass}`}
            >
              <h3 className="text-base font-semibold">
                Recent activity
              </h3>

              <p className={`mt-1 text-sm ${subtleClass}`}>
                Latest activity across your systems
              </p>

              <div
                className={`flex min-h-40 items-center justify-center text-sm ${subtleClass}`}
              >
                No activity yet
              </div>
            </div>

            <div
              className={`min-w-0 rounded-2xl border p-6 ${cardClass}`}
            >
              <h3 className="text-base font-semibold">
                Quick actions
              </h3>

              <p className={`mt-1 text-sm ${subtleClass}`}>
                Common tasks
              </p>

              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={() => setShowBusinessForm(true)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                    darkMode
                      ? "border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>Add business</span>
                  <span className={subtleClass}>→</span>
                </button>

                {["Create project", "Add website", "Check systems"].map(
                  (action) => (
                    <button
                      key={action}
                      type="button"
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                        darkMode
                          ? "border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{action}</span>
                      <span className={subtleClass}>→</span>
                    </button>
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}