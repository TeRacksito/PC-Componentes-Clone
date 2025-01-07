import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export function FullLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
}
