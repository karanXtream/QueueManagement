"use client";

import { useState } from "react";
import { useClinic } from "../context/ClinicContext";

export default function AddPatientCard() {
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const { addPatient, state } = useClinic();

  const handleAdd = async () => {

    if (!name.trim() || loading) return;

    try {
      setLoading(true);
      const response = await fetch("/api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName: name,
        }),
      });

      const data = await response.json();

      if (!data.success) return;

      addPatient(data.patient);
      setName("");

    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };


  return (
  <div className="bg-white border rounded-xl p-5">
    {loading && (
    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mb-4">
      <div className="h-full bg-blue-600 animate-pulse w-full"></div>
    </div>
  )}

    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold mb-4 text-blue-400">
        Add Patient
      </h3>

      <input
        className="w-full border rounded-lg p-3 placeholder-gray-400 text-black"
        value={name}
        disabled={loading}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
        placeholder="Patient name"
      />

      <button
        onClick={handleAdd}
        disabled={loading}
        className="mt-3 w-full bg-blue-600 text-white p-3 rounded-lg"
      >
        {loading ? "Saving..." : "Assign Token"}
      </button>
    </div>
 </div>
);
}