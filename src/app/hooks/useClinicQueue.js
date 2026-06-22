"use client";

import { useEffect, useState } from "react";

export default function useClinicQueue() {
  const [state, setState] = useState({
    queue: [],
    currentToken: null,
    nextToken: 1,
    avgTime: 5,
    seenCount: 0,
  });

  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("clinicq_state");

    if (saved) {
      setState(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clinicq_state", JSON.stringify(state));
  }, [state]);

  const showToast = (msg) => {
    setToast(msg);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

const addPatient = (patient) => {
  setState((prev) => ({
    ...prev,
    queue: [
      ...prev.queue,
      {
        _id: patient._id,
        token: patient.token,
        name: patient.patientName,
        addedAt: Date.now(),
      },
    ],
  }));
};

  const callNext = () => {
    if (!state.queue.length) return;

    const next = state.queue[0];

    setState((prev) => ({
      ...prev,
      queue: prev.queue.slice(1),
      currentToken: next,
      seenCount:
        prev.currentToken != null
          ? prev.seenCount + 1
          : prev.seenCount,
    }));
  };

const removePatient = (index) => {
  setState((prev) => {
   

    const updated = prev.queue.filter(
      (_, i) => i !== index
    );
    return {
      ...prev,
      queue: updated,
    };
  });
};

  const resetQueue = () => {
    setState({
      queue: [],
      currentToken: null,
      nextToken: 1,
      avgTime: 5,
      seenCount: 0,
    });
  };

  

  return {
    state,
    setState,
    addPatient,
    callNext,
    removePatient,
    resetQueue,
    toast,
  };
}