"use client";

import { User, Clock, Bell } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function PatientQueueScreen() {
  const params = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPatient() {
      try {
        const res = await fetch(`/api/patient/${params.id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch patient");
        }

        const data = await res.json();
       

        if (data.success) {
          setPatient(data);
        }
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    }

    if (params?.id) {
      getPatient();
    }
  }, [params?.id]);

  useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("queue-update", (data) => {


      setPatient((prev) => {
        if (!prev) return prev;

        const tokensAhead = Math.max(
          0,
          prev.token -
          data.currentServing -
          1
        );


        return {
          ...prev,
          currentServing:
            data.currentServing,

          tokensAhead,

          estimatedWait:
            tokensAhead *
            data.avgConsultationTime,
        };
      });

    });

    return () => {
      socket.disconnect();
    };
  }, []);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-slate-600 text-lg">
            Loading patient data...
          </p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Patient not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              आयुष्मान Clinic
            </h1>

            <p className="text-slate-500">
              Your Queue, Live Updates
            </p>
          </div>

          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
            ● LIVE
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-sm border p-10 text-center">
          <p className="text-2xl text-slate-500 mb-2">
            Hello,
          </p>

          <h2 className="text-5xl font-bold text-slate-900">
            {patient.patientName}
          </h2>

          <p className="text-slate-500 text-xl mt-3">
            Here's your queue status
          </p>

          {

            patient.token == patient.currentServing ? <div className="mt-8 inline-block border-2 border-blue-200 rounded-3xl px-16 py-8 bg-red-600">
              <p className="text-white font-semibold text-xl">
                Your Turn
              </p>

              <h1 className="text-[120px] leading-none font-extrabold text-white">
                #{patient.token}
              </h1>
            </div> : <div className="mt-8 inline-block border-2 border-blue-200 rounded-3xl px-16 py-8">
              <p className="text-blue-600 font-semibold text-xl"> 
                YOUR TOKEN
              </p>

              <h1 className="text-[120px] leading-none font-extrabold text-blue-600">
                #{patient.token}
              </h1>
            </div>

          }


        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8 justify-center">
          <div className="bg-white rounded-3xl border shadow-sm p-8 items-center flex flex-col">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <User className="text-blue-600" />
            </div>

            <p className="mt-5 text-slate-500 font-medium uppercase">
              Currently Serving
            </p>

            <h3 className="text-6xl font-bold text-blue-600 mt-4">
              #{patient.currentServing}
            </h3>
          </div>

          <div className="bg-white rounded-3xl border shadow-sm p-8 items-center flex flex-col">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
              <User className="text-purple-600" />
            </div>

            <p className="mt-5 text-slate-500 font-medium uppercase">
              Waiting Ahead
            </p>

            <h3 className="text-6xl font-bold text-purple-600 mt-4">
              {patient.tokensAhead}
            </h3>

            <p className="text-slate-500 mt-2">
              patients ahead
            </p>
          </div>

          <div className="bg-white rounded-3xl border shadow-sm p-8 items-center flex flex-col">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <Clock className="text-green-600" />
            </div>

            <p className="mt-5 text-slate-500 font-medium uppercase">
              Estimated Wait
            </p>

            <h3 className="text-6xl font-bold text-green-600 mt-4">
              ~{patient.estimatedWait}m
            </h3>

            <p className="text-slate-500 mt-2">
              average consultation {patient.avgConsultationTime}m
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border shadow-sm mt-8 p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-40 h-40 rounded-full bg-slate-100 flex items-center justify-center">
              <Bell size={60} className="text-blue-600" />
            </div>

            <div>
              <h3 className="text-4xl font-bold text-slate-900">
                You're in line!
              </h3>

              <p className="text-slate-500 text-xl mt-3">
                We'll notify you when your token is being called.
              </p>

              <div className="mt-6 bg-blue-50 text-blue-600 px-6 py-4 rounded-2xl inline-flex items-center gap-3">
                <Bell size={18} />
                Please wait, your turn is coming soon.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm mt-8 p-5 text-center">
          <p className="text-blue-600">
            Please keep this page open to get live updates.
          </p>
        </div>
      </div>
    </div>
  );
}