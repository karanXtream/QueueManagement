"use client";

import Header from "./components/Header";
import StatsRow from "./components/StatsRow";
import AddPatientCard from "./components/AddPatientCard";
import CurrentTokenCard from "./components/CurrentTokenCard";
import SettingsCard from "./components/SettingsCard";
import QueueList from "./components/QueueList";
import Toast from "./components/Toast";


import useClinicQueue from "./hooks/useClinicQueue";

import { ClinicContext } from "./context/ClinicContext";

export default function Home() {
  const clinic = useClinicQueue();

  return (
    <ClinicContext.Provider value={clinic}>
      <div className="min-h-screen bg-slate-100">
        <Header />

        <main className="max-w-7xl mx-auto p-6">
          <StatsRow />

          <div className="grid lg:grid-cols-[380px_1fr] gap-5 mt-5">
            <div className="space-y-5">
              <AddPatientCard />
              <CurrentTokenCard />
              <SettingsCard/>
                    
               </div>
            

            <QueueList />
          </div>
        </main>

        <Toast message={clinic.toast} />
      </div>
    </ClinicContext.Provider>
  );
}