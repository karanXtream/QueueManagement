"use client";

import { useClinic } from "../context/ClinicContext";

export default function CurrentTokenCard() {
    const { state, callNext } = useClinic();

  const handleButtonClick = async () => {
  try {
    const res = await fetch("/api/next-token", {
      method: "POST",
    });

    const data = await res.json();

    if (!data.success) return;

    callNext(); // update UI only after DB succeeds

  } catch (error) {
    
  }
};

    return (
        <div className="bg-white border rounded-xl p-5">
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white text-center p-5">
                <div className="text-xs uppercase">
                    Current Token
                </div>

                <div className="text-5xl font-bold">
                    {state.currentToken
                        ? `#${state.currentToken.token}`
                        : "—"}
                </div>

                <div>
                    {state.currentToken?.name ||
                        "No patient yet"}
                </div>
            </div>

            <button
                onClick={handleButtonClick}
                disabled={!state.queue.length}
                className="mt-4 w-full bg-green-600 text-white p-3 rounded-lg disabled:bg-gray-400 cursor-pointer"
            >
                Call Next Token
            </button>
        </div>
    );
}