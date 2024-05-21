import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";

export type NavLinks = {
  icon: JSX.Element,
  label: string,
  href: string
}

export const navLinks: NavLinks[] = [
  {
    href: "/",
    icon: <Home className="h-4 w-4" />,
    label: "Dashboard"
  },
  {
    href: "/orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    label: "Orders"
  },
  {
    href: "/products",
    icon: <Package className="h-4 w-4" />,
    label: "Products"
  },
  {
    href: "/customers",
    icon: <Users className="h-4 w-4" />,
    label: "Customers"
  },
  {
    href: "/analytics",
    icon: <LineChart className="h-4 w-4" />,
    label: "Analytics"
  },
]
