"use client";

import Image from "next/image";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Clients", icon: "◉" },
  { name: "Websites", icon: "▣" },
  { name: "Hosting", icon: "◈" },
  { name: "Email", icon: "✉" },
  { name: "Projects", icon: "✓" },
  { name: "Monitoring", icon: "◌" },
];

const stats = [
  {
    title: "Clients",
    value: "0",
    description: "Active businesses",
  },
  {
    title: "Websites",
    value: "0",
    description: "Managed websites",
  },
  {
    title: "Projects",
    value: "0",
    description: "Active projects",
  },
  {
    title: "Systems",
    value: "0",
    description: "Monitored systems",
  },
];

const quickActions = [
  "Add client",
  "Create project",
  "Add website",
  "Check systems",
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  const pageClass = darkMode
    ? "bg-slate-950 text-slate-100"
    : "bg-slate-100 text-slate-900";

  const sidebarClass = darkMode
    ? "bg-slate-950 border-slate-800"
    : "bg-white border-slate-200";

  const cardClass = darkMode
    ? "bg-slate-900 border-slate-800"
    : "bg-white border-slate-200";

  const mutedClass = darkMode
    ? "text-slate-400"
    : "text-slate-600";

  const subtleClass = darkMode
    ? "text-slate-500"
    : "text-slate-500";

  const borderClass = darkMode
    ? "border-slate-800"
    : "border-slate-200";

  return (
    <div
      className={`flex min-h-screen w-full overflow-x-hidden ${pageClass}`}
    >
      {/* Sidebar */}
      <aside
        className={`hidden w-50 shrink-0 flex-col border-r lg:flex ${sidebarClass}`}
      >
        {/* Logo */}
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

        {/* Navigation */}
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

        {/* System Status */}
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
            <h1 className="text-lg font-semibold">
              Dashboard
            </h1>

            <p className={`mt-1 truncate text-sm ${subtleClass}`}>
              Overview of your Nyota One operations
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Theme */}
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

            {/* Notifications */}
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

            {/* Profile */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              R
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto w-full max-w-7xl p-5 sm:p-6 lg:p-8">
          {/* Welcome */}
          <section className="mb-7">
            <p
              className={`mb-2 text-sm font-medium ${subtleClass}`}
            >
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
            {stats.map((stat) => (
              <div
                key={stat.title}
                className={`rounded-2xl border p-5 ${cardClass}`}
              >
                <div
                  className={`text-sm font-medium ${subtleClass}`}
                >
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

          {/* Main Panels */}
          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Recent Activity */}
            <div
              className={`min-w-0 rounded-2xl border p-6 xl:col-span-2 ${cardClass}`}
            >
              <div>
                <h3 className="text-base font-semibold">
                  Recent activity
                </h3>

                <p className={`mt-1 text-sm ${subtleClass}`}>
                  Latest activity across your systems
                </p>
              </div>

              <div
                className={`flex min-h-56 items-center justify-center text-sm ${subtleClass}`}
              >
                No activity yet
              </div>
            </div>

            {/* Quick Actions */}
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
                {quickActions.map((action) => (
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

                    <span className={subtleClass}>
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}