import { fetchFilteredCustomers } from "@/app/lib/data";
import { TableRowSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import FormattedCustomersTable from "@/app/ui/customers/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function CustomersPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const customers = await fetchFilteredCustomers(query);
  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<TableRowSkeleton />}>
        <FormattedCustomersTable customers={customers} />
      </Suspense>
    </div>
  );
}
