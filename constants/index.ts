import { Settings, ListChecks, Grid2X2, Loader, BarChart } from "lucide-react";

export const SidebarLinks = [
  {
    label: "My Products",
    route: "/products",
    icon: ListChecks,
  },
  {
    label: "Categories",
    route: "/categories",
    icon: Grid2X2,
  },
  {
    label: "Orders",
    route: "/orders",
    icon: Loader,
  },
  {
    label: "Analytics",
    route: "/analytics",
    icon: BarChart,
  },
  {
    label: "Settings",
    route: "/settings",
    icon: Settings,
  },
];
