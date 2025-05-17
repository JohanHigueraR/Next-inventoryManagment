"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAppSelector } from "@/app/redux";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
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

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="flex flex-col bg-[var(--color-bg)] min-h-screen">
        <Header name="Inventory" />
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.productId}
          checkboxSelection
          className="bg-[var(--color-card-bg)] shadow rounded-lg border border-[var(--color-gray-200)] mt-5 !text-[var(--color-text)]"
        />
      </div>
    </ThemeProvider>
  );
};

export default Inventory;