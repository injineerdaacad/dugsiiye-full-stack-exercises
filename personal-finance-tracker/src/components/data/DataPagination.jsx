import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export default function DataPagination({
  currentPage,
  pageSize,
  pageSizeOptions = [5, 10, 20],
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) {
  const pageStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const pageEnd = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t pt-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Showing {pageStart}-{pageEnd} of {totalItems}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="w-28"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option} / page
            </option>
          ))}
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="px-2">Page {currentPage} of {totalPages}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
