"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  
  // Determine active item based on the pathname
  const getActiveNetwork = () => {
    if (pathname === "/") return "general";
    if (pathname?.startsWith("/youtube")) return "youtube";
    if (pathname?.startsWith("/tiktok")) return "tiktok";
    if (pathname?.startsWith("/instagram")) return "instagram";
    if (pathname?.startsWith("/facebook")) return "facebook";
    return "";
  };

  const currentNetwork = getActiveNetwork();

  const getLinkClass = (network: string) => {
    const isActive = currentNetwork === network;
    return `flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all ${
      isActive 
        ? "bg-indigo-50 text-indigo-700 font-bold shadow-sm" 
        : "text-slate-700 hover:bg-slate-50 font-semibold"
    }`;
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col">
        <Link href="/" className="font-black text-2xl text-slate-900 hover:text-indigo-600 transition-colors">
          Metrics Studio
        </Link>
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Administración Multi-Red</span>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* General Section */}
        <div>
          <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest px-2">General</span>
          <div className="mt-3">
            <Link href="/" className={getLinkClass("general")}>
              <span>Dashboard Principal</span>
            </Link>
          </div>
        </div>

        {/* Networks Section */}
        <div>
          <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest px-2">Redes Sociales</span>
          <div className="mt-3 space-y-1.5">
            <Link href="/youtube" className={getLinkClass("youtube")}>
              <span>YouTube</span>
            </Link>
            
            <Link href="/tiktok" className={getLinkClass("tiktok")}>
              <span>TikTok</span>
            </Link>

            <Link href="/instagram" className={getLinkClass("instagram")}>
              <span>Instagram</span>
            </Link>

            <Link href="/facebook" className={getLinkClass("facebook")}>
              <span>Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
