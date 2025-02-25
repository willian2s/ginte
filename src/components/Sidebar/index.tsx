"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Users, UserPlus, LogOut, Menu } from "lucide-react";
import { useAuth } from "../../hook/useAuth";
import { toast } from "react-hot-toast";
import { Logo } from "../Logo";

interface SidebarProps {
  isMobile?: boolean;
}

export const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  const menuItems = [
    {
      icon: Users,
      label: "Clientes",
      href: "/",
    },
    {
      icon: UserPlus,
      label: "Cadastrar Cliente",
      href: "/customer",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    setIsSidebarOpen(false);
    toast.success("Logout realizado com sucesso!");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-lg shadow-lg"
        >
          <Menu className="w-6 h-6 text-zinc-800" />
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0
          w-[260px] h-screen bg-white border-r border-neutral-300
          transform transition-transform duration-300 z-40
          ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full justify-between overflow-auto">
          {/* Top Section */}
          <div className="px-4 py-8 flex flex-col items-center">
            {/* Logo */}
            <Logo className="text-zinc-800" />

            {/* User Info */}
            {user && (
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-zinc-800">{user.name}</p>
                <p className="text-xs text-zinc-500">{user.email}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-12 w-full space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                  className={`
              w-full flex items-center gap-2 px-3 py-2 rounded-lg
              font-semibold transition-colors
              ${
                isActive(item.href)
                  ? "bg-green-900 bg-opacity-10 text-zinc-800"
                  : "text-zinc-800 hover:bg-zinc-100"
              }
            `}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Logout Section */}
          <div className="w-full p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-800 font-semibold hover:bg-zinc-100"
            >
              <LogOut className="w-6 h-6" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
