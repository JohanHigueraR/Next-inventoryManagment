"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "../redux";
import { createTheme, ThemeProvider } from "@mui/material";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      background: {
        default: isDarkMode ? "#18181b" : "#f9fafb",
        paper: isDarkMode ? "#23272f" : "#f3f4f6",
      },
      text: {
        primary: "var(--color-text)",
      },
    },
  });
  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <ThemeProvider theme={muiTheme}> 
      <div className="flex flex-col">
        <Header name="Users" />
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.userId}
          checkboxSelection
          className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        />
      </div>
    </ThemeProvider>
  );
};

export default Users;
