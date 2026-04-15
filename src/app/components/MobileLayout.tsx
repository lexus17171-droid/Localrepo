import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Trash2, MapPin, ScanLine, AlertCircle, Trophy, User } from "lucide-react";

export function MobileLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/app", icon: Home, label: "Home" },
    { path: "/app/bin-status", icon: Trash2, label: "Bins" },
    { path: "/app/truck-tracking", icon: MapPin, label: "Track" },
    { path: "/app/ai-assistant", icon: ScanLine, label: "Scan" },
    { path: "/app/rewards", icon: Trophy, label: "Rewards" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center py-2 px-2 transition-colors ${
                  isActive
                    ? "text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
