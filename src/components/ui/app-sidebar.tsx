import { Home, Hospital, Dna, Speaker, Activity } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/user",
    icon: Home,
  },
  {
    title: "Announcments",
    url: "/user/announcements",
    icon: Speaker,
  },
  {
    title: "Disease Info",
    url: "/user/disease-info",
    icon: Dna,
  },
  {
    title: "Health Updates",
    url: "/user/health-updates",
    icon: Activity,
  },
  {
    title: "Vaccination Center",
    url: "/user/vaccination-center",
    icon: Hospital,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Health-App</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
