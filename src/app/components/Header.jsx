"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();

    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white border-b px-7 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
        <h1 className="font-extrabold text-blue-600 text-lg">
          ClinicQ
        </h1>
        <span className="text-slate-500 text-sm">
          Receptionist
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
          LIVE SYNC
        </div>

        <span className="font-mono text-sm text-red-600 font-semibold">
          {clock}
        </span>
      </div>
    </header>
  );
}