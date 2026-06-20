"use client";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg">
      {message}
    </div>
  );
}