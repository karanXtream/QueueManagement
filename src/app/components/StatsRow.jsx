"use client";

import { useState } from "react";
import { useClinic } from "../context/ClinicContext";

export default function StatsRow() {
  const { state } = useClinic();


  return (
    <div className="grid md:grid-cols-4 gap-4 text-[#6474A9] font-semibold  justify-center">
      <Stat
        title="Currently Serving"
        value={
          state.currentToken
            ? `#${state.currentToken.token}`
            : "—"
        }
      />

      <Stat
        title="Waiting"
        value={state.queue.length}
      />


      <Stat
        title="Avg Wait"
        value={`~${state.queue.length * state.avgTime}m`}
      />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-xs uppercase text-slate-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}