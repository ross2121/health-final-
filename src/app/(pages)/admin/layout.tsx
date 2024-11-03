import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import "@/components/map/map.css";
import "mapbox-gl/dist/mapbox-gl.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="ml-10">{children}</div>
      </main>
    </SidebarProvider>
  );
}
