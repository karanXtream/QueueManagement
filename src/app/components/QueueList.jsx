"use client";

import { useClinic } from "../context/ClinicContext";
import { useState } from "react";
import { QrCode } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function QueueList() {
    const { state, removePatient } = useClinic();
    // const [selectedPatient, setSelectedPatient] = useState(null);
    const [expandedPatient, setExpandedPatient] = useState(null);

    const [search, setSearch] = useState("");

    const filteredQueue = state.queue.filter((patient) =>
        patient.name.toLowerCase().includes(search.toLowerCase())
    );

    if (!state.queue.length) {
        return (
            <div className="bg-white border border-gray-200 text-black rounded-xl p-10 text-center">
                No patients in queue
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-xl p-5">
            <div className="max-h-[700px] overflow-y-auto pr-2">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search patient..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black  font-light"
                    />
                </div>
                {filteredQueue.map((patient, index) => {
                    const waitMins = (index + 1) * state.avgTime;

                    const addedTime = new Date(
                        patient.addedAt
                    ).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    return (
                        <div key={patient._id || patient.token}>
                            {/* Main Patient Row */}
                            <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4 mb-2 bg-slate-50">

                                <div className="w-6 text-center text-slate-500 font-semibold">
                                    {index + 1}
                                </div>

                                <div className="bg-blue-100 text-blue-600 font-bold px-4 py-2 rounded-lg min-w-[70px] text-center">
                                    #{patient.token}
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-slate-900">
                                        {patient.name}
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        Added at {addedTime}
                                    </p>
                                </div>

                                <div className="bg-amber-100 text-amber-600 px-3 py-1 rounded-md font-semibold text-sm">
                                    ~{waitMins} min
                                </div>

                                {/* QR Button */}
                                <button
                                    onClick={() =>
                                        setExpandedPatient(
                                            expandedPatient === patient._id
                                                ? null
                                                : patient._id
                                        )
                                    }
                                    className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition"
                                >
                                    <QrCode size={22} />
                                </button>

                                {/* Remove Button */}
                                <button
                                    onClick={() =>
                                        removePatient(
                                            state.queue.findIndex(
                                                (p) => p.token === patient.token
                                            )
                                        )
                                    }
                                    className="bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Expandable QR Section */}
                            {expandedPatient === patient._id && (
                                <div className="border border-slate-200 rounded-xl bg-white p-4 mb-3 flex flex-col items-center">

                                    <QRCodeCanvas
                                        value={`${window.location.origin}/patients/${patient._id}`}
                                        size={120}
                                    />

                                    <p className="mt-3 font-semibold text-slate-900">
                                        {patient.name}
                                    </p>

                                    <p className="text-slate-500">
                                        Token #{patient.token}
                                    </p>

                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    );
}