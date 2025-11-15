// Navbar.tsx
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { LayoutDashboard, UserCheck, Activity, Bolt } from "lucide-react";

export function Navbar() {
// Add to your navigationButtons array
const navigationButtons = [
  { to: "/decking", label: "Decking", icon: Activity },
  { to: "/active", label: "Active", icon: UserCheck },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/coaches", label: "Coaches", icon: UserCheck }, // New page
];


  return (
    <div className="border-b bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Left side: Logo + Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg" />
            <h2 className="text-xl font-semibold text-gray-800">PT HUB</h2>
          </div>

          <nav className="flex gap-2">
            {navigationButtons.map((button) => {
              const Icon = button.icon;
              return (
                <NavLink
                  key={button.to}
                  to={button.to}
                  className={({ isActive }) =>
                    `transition-all duration-200 rounded-md ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "text-gray-700 hover:bg-purple-100"
                    }`
                  }
                >
                  <Button variant="ghost" className="gap-2 px-4 py-2 text-sm font-medium flex items-center">
                    <Icon className="w-4 h-4" />
                    {button.label}
                  </Button>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Right side: Action Button */}
        <NavLink to="/action">
        <Button className="gap-2 px-20 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium">
            <Bolt className="w-4 h-4" />
            Action
        </Button>
        </NavLink>


      </div>
    </div>
  );
}
