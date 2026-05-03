"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, GraduationCap, Home, Layers, LogOut, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "../providers/user-provider";
import Image from "next/image";

const menuItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Students", href: "/students", icon: Users },
  { label: "Teachers", href: "/teachers", icon: GraduationCap },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Subjects", href: "/subjects", icon: Layers },
];
export function AppSidebar() {
  const pathname = usePathname();
  
  const {user,loading} = useUser();
  
  

  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1">
          <div className="hidden size-8 items-center justify-center rounded-md bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground group-data-[collapsible=icon]:flex">
            S
          </div>
          <h1 className="text-lg font-bold group-data-[collapsible=icon]:hidden">S.M.S</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      data-active={isActive}
                      className="group-data-[collapsible=icon]:justify-center"
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-md p-2 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
          <Image
            src={user?.avatarUrl || "./globe.svg"}
            alt="User avatar"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium">{user?.name || "User"}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.role?.toLowerCase() || "User"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer gap-2 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0"
          >
            <LogOut className="size-4" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
