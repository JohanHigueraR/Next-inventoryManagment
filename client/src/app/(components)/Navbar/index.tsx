"use client";
import { Bell, MenuIcon, Moon, Settings, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const handleToggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  const isSideCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toogleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSideCollapsed));
  };
  
  return (
    <div className="flex justify-between items-center w-full mb-7 ">
      {/* {"left side"} */}
      <div className="flex justify-center items-center gap-5">
        <button
          className="px-3 py-3 bg-[var(--color-gray-100)] rounded-full hover:bg-[var(--color-blue-100)]"
          onClick={toogleSidebar}
        >
          <MenuIcon className="w-4 h-4 text-[var(--color-text)]" />
        </button>
        <div className="relative">
          <input

          
            type="search"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-[var(--color-gray-300)] bg-[var(--color-bg)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
            placeholder="Search..."
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-[var(--color-gray-500)]" size={20} />
          </div>
        </div>
      </div>
      {/* {"Right side"} */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={handleToggleDarkMode}>
              {!isDarkMode ? (
                <Moon
                  className="cursor-pointer w-4 h-4 text-[var(--color-gray-500)]"
                  size={24}
                />
              ) : (
                <Sun
                  className="cursor-pointer w-4 h-4 text-[var(--color-yellow-400)]"
                  size={24}
                />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-[var(--color-gray-500)]" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-[var(--color-red-100)] bg-[var(--color-red-400)] rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-[var(--color-gray-300)] mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 bg-[var(--color-gray-200)] rounded-full" />
            <span className="font-semibold text-[var(--color-text)]"> Johan Higuera</span>
          </div>
        </div>
        <Link href={"/settings"}>
          <Settings
            className="cursor-pointer text-[var(--color-gray-500)]"
            size={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
