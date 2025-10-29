import type { ReactNode } from "react";
import { Header } from "./Header";


export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};
