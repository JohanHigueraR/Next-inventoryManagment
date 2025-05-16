import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../(components)/Rating";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  console.log(dashboardMetrics);

  return (
    <div className="row-span-3 xl:row-span-6 bg-[var(--color-card-bg)] shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="mt-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-7 ">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {Array.isArray(dashboardMetrics?.popularProducts) &&
            dashboardMetrics.popularProducts.length > 0 ? (
              dashboardMetrics.popularProducts.map((product) => (
                <div
                  key={product.productId}
                  className="flex justify-between items-center gap-3 px-5 py-7 border-b border-[var(--color-gray-300)]"
                >
                  <div className="flex items-center gap-3">
                    <div>img</div>
                    <div className="flex flex-col justify-between gap-1">
                      <div className="font-bold text-[var(--color-gray-700)]">
                        {product.name}
                      </div>
                      <div className="flex text-sm items-center">
                        <span className="font-bold text-[var(--color-blue-500)] text-xs ">
                          ${product.price}
                        </span>
                        <span className="mx-2">|</span>
                        <Rating rating={product.rating || 0} ></Rating>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs flex items-center" >
                  <button className="p-2 rounded-full bg-[var(--bg-blue-100)] text-[var(--bg-blue-600)] mr-2 " >
                    <ShoppingBag className="w-4 h-4" ></ShoppingBag>
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k semibold
                  </div>
                </div>
              ))
            ) : (
              <div className="px-7 py-7 text-[var(--color-gray-500)]">
                No popular products found.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
