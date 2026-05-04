import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

interface SidebarItem {
  title?: string;
  url?: string;
  icon?: any;
  items?: {
    title: string;
    url?: string;
    circleColor: string;
  }[];
  label?: string;
}

export function NavMain({ items }: { items: SidebarItem[] }) {
  const location = useLocation();
  const pathname = location.pathname;

  // State: which dropdown is open
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Toggle a dropdown
  const handleToggleGroup = (title?: string) => {
    if (!title) return;
    setOpenGroup((prev) => (prev === title ? null : title));
  };

  // Check if dropdown contains active page
  const isDropdownActive = (item: SidebarItem) => {
    if (!item.items) return false;
    return item.items.some(
      (sub) => sub.url && (pathname === sub.url || pathname.startsWith(sub.url))
    );
  };

  return (
    <SidebarGroup className="flex flex-col w-full px-4 py-3">
      <SidebarMenu>
        {items.map((item) => {
          // Dropdown with subitems
          if (item.items && item.items.length > 0 && item.title) {
            const isActiveDropdown = isDropdownActive(item);
            const isOpen = isActiveDropdown || openGroup === item.title;

            return (
              <SidebarMenuItem key={item.title}>
                <Collapsible open={isOpen}>
                  <div>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => handleToggleGroup(item.title)}
                        className={cn(
                          "flex items-center py-5.5 px-3 text-base transition-all duration-300",
                          isOpen 
                            ? "bg-[#6366F1]/20 text-[#22D3EE] border border-[#6366F1]/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {item.icon && (
                          <item.icon className={cn("!w-4.5 !h-4.5", isOpen ? "text-[#22D3EE]" : "")} />
                        )}
                        <span className="font-semibold tracking-tight">{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "ms-auto transition-transform duration-200",
                            isOpen ? "rotate-90" : ""
                          )}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub className="mt-2 ms-6 space-y-1 border-l border-[#6366F1]/20">
                        {item.items.map((subItem) => {
                          if (!subItem.url) return null;
                          const isSubActive =
                            pathname === subItem.url ||
                            pathname.startsWith(subItem.url);

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={cn(
                                  "py-5.5 px-3 text-base transition-all duration-300",
                                  isSubActive
                                    ? "text-[#22D3EE] font-bold bg-[#22D3EE]/5"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                )}
                              >
                                <NavLink
                                  to={subItem.url}
                                  className="flex items-center gap-3.5"
                                  onClick={() =>
                                    item.title && setOpenGroup(item.title)
                                  }
                                >
                                  <span
                                    className={cn(
                                      "w-1.5 h-1.5 rounded-full",
                                      isSubActive ? "bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" : subItem.circleColor
                                    )}
                                  />
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </SidebarMenuItem>
            );
          }

          // Label
          if (item.label) {
            return (
              <SidebarGroupLabel key={`label-${item.label}`} className="px-3 text-[10px] uppercase font-black tracking-widest mb-2 text-slate-500">
                {item.label}
              </SidebarGroupLabel>
            );
          }

          // Top-level single page
          if (item.url && item.title) {
            const isMenuActive =
              pathname === item.url || pathname.startsWith(item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    "flex items-center py-5.5 px-3 text-base transition-all duration-300",
                    isMenuActive 
                      ? "bg-[#6366F1]/20 text-[#22D3EE] border border-[#6366F1]/20 shadow-[0_0_15px_rgba(99,102,241,0.1)] font-bold" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={() => setOpenGroup(null)} // Close all dropdowns
                >
                  <Link to={item.url} className="flex items-center gap-2">
                    {item.icon && (
                      <item.icon className={cn("!w-4.5 !h-4.5", isMenuActive ? "text-[#22D3EE] drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" : "")} />
                    )}
                    <span className="font-semibold tracking-tight">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return null;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
