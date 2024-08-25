import { NavBar } from "./components/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white" />
      <NavBar />
      {children}
    </div>
  );
}
