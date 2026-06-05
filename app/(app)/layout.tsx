import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { PageTransition } from "@/components/ui/PageTransition";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-night-950">
      <Sidebar />
      <div className="md:pl-60">
        <Topbar />
        <main className="mx-auto max-w-5xl px-4 py-6 pb-24 md:px-8 md:pb-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
