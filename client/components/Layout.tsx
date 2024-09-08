import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Navbar />
      <main className="mx-auto p-4">{children}</main>
    </div>
  );
}
