"use client";

import {
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from "@/state/api";
import { useMemo, useState } from "react";
import Header from "@/app/(components)/Header";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = { name: data.category, amount: 0 };
          acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          acc[data.category].amount += amount;
        }
        return acc;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  const pieColors = [
    '#2563eb', // blue
    '#f59e42', // orange
    '#10b981', // green
    '#f43f5e', // red
    '#a21caf', // purple
    '#eab308', // yellow
    '#0ea5e9', // sky
    '#f472b6', // pink
    '#64748b', // slate
    '#22d3ee', // cyan
  ];

  const classNames = {
    label: "block text-sm font-medium text-[var(--color-text)]",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-[var(--color-gray-300)] bg-[var(--color-card-bg)] text-[var(--color-text)] placeholder-[var(--color-gray-500)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm rounded-md transition-colors [&::-webkit-calendar-picker-indicator]:invert-0 dark:[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-75 dark:[&::-webkit-calendar-picker-indicator]:brightness-150",
  };

  if (isLoading) {
    return <div className="py-4 text-[var(--color-text)]">Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className="text-center text-[var(--color-red-500)] py-4">
        Failed to fetch expenses
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] pb-10">
      {/* HEADER */}
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-[var(--color-gray-500)]">
          A visual representation of expenses over time.
        </p>
      </div>

      {/* FILTERS & PIE CHART */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* FILTERS */}
        <div className="w-full md:w-1/3 bg-[var(--color-card-bg)] shadow-lg rounded-xl p-6 border border-[var(--color-gray-200)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text)]">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>
            {/* START DATE */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className={classNames.selectInput}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {/* END DATE */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className={classNames.selectInput}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* PIE CHART */}
        <div className="flex-grow bg-[var(--color-card-bg)] shadow-lg rounded-xl p-4 md:p-6 border border-[var(--color-gray-200)] flex items-center justify-center min-h-[420px]">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                innerRadius={70}
                paddingAngle={2}
                stroke="var(--color-bg)"
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                isAnimationActive={true}
              >
                {aggregatedData.map((entry: AggregatedDataItem, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === activeIndex
                        ? pieColors[index % pieColors.length]
                        : pieColors[index % pieColors.length] + 'cc' // 80% opacity for inactive
                    }
                    strokeWidth={index === activeIndex ? 4 : 2}
                    style={{ filter: index === activeIndex ? `drop-shadow(0 0 8px ${pieColors[index % pieColors.length]})` : undefined }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--color-card-bg)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-gray-300)",
                  borderRadius: 8,
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.15)",
                  fontWeight: 500,
                }}
                itemStyle={{ color: "var(--color-primary)" }}
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name
                ]}
              />
              <Legend
                wrapperStyle={{ color: "var(--color-text)", fontWeight: 600, fontSize: 16 }}
                iconType="circle"
                align="right"
                verticalAlign="middle"
                layout="vertical"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
