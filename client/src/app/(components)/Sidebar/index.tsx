"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Menu,
  LucideIcon,
  Layout,
  Archive,
  Clipboard,
  User,
  SlidersHorizontal,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SiderBarItemsProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarItems = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SiderBarItemsProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-[var(--color-primary)] hover:bg-[var(--color-blue-100)] gap-3 transition-colors ${
          isActive ? "bg-[var(--color-blue-200)] text-[var(--color-text)]" : ""
        }`}
      >
        <Icon className="w-6 h-6 text-[var(--color-text)]" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-[var(--color-text)]`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSideCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toogleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSideCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSideCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-[var(--color-bg)] transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sidebarClassNames}>
      {/* TOP TITLE */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSideCollapsed ? "px-5" : "px-8"
        } `}
      >
        <div>Logo</div>
        <h1
          className={`font-extrabold text-2xl ${
            isSideCollapsed ? "hidden" : "block"
          } text-[var(--color-text)]`}
        >
          COMERCIO EN UNO
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-[var(--color-gray-100)] rounded-full hover:bg-[var(--color-blue-100)]"
          onClick={toogleSidebar}
        >
          <Menu className="w-4 h-4 text-[var(--color-text)]" />
        </button>
      </div>
      {/* ITEMS LINKS */}
      <div className="flex-grow mt-8">
        <SidebarItems
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSideCollapsed}
        ></SidebarItems>
        <SidebarItems
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSideCollapsed}
        ></SidebarItems>
        <SidebarItems
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSideCollapsed}
        ></SidebarItems>
        <SidebarItems
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSideCollapsed}
        ></SidebarItems>
        <SidebarItems
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSideCollapsed}
        ></SidebarItems>
        <SidebarItems
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSideCollapsed}
        ></SidebarItems>
      </div>
      <div className={`${isSideCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-[var(--color-gray-500)]">
          &copy; 2025 Comercio en uno
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
