"use client";

import { useState } from "react";

import LoadingScreen from "@/components/loading/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Archive from "@/components/sections/Archive";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <LoadingScreen
          duration={1000}
          onComplete={() => setLoading(false)}
        />
      )}

      <Navbar />

      <main>
        <Hero />
        <About />
        <Archive />
        <Footer />
      </main>
    </>
  );
}