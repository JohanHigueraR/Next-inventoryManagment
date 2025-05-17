"use client";

import React, { useState } from "react";
import Header from "@/app/(components)/Header";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] pb-10">
      <Header name="User Settings" />
      <div className="overflow-x-auto mt-5 shadow-lg rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-gray-200)] mx-auto max-w-2xl">
        <table className="min-w-full rounded-lg">
          <thead className="bg-[var(--color-primary)] text-[var(--color-card-bg)]">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-[var(--color-blue-100)] transition-colors" key={setting.label}>
                <td className="py-2 px-4 font-medium text-[var(--color-text)]">
                  {setting.label}
                </td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="w-11 h-6 bg-[var(--color-gray-300)] rounded-full peer peer-focus:ring-[var(--color-primary)] peer-focus:ring-4 transition peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--color-card-bg)] after:border-[var(--color-gray-400)] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border border-[var(--color-gray-300)] rounded-lg bg-[var(--color-card-bg)] text-[var(--color-text)] placeholder-[var(--color-gray-500)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;