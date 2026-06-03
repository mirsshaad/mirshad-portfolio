"use client";

import React from "react";
import { useOSStore } from "@/store/os.store";
import BootScreen from "@/components/os/BootScreen";
import Desktop from "@/components/os/Desktop";

export default function Home() {
  const booted = useOSStore((state) => state.booted);

  return (
    <main className="w-screen h-screen overflow-hidden relative select-none">
      {!booted ? <BootScreen /> : <Desktop />}
    </main>
  );
}
