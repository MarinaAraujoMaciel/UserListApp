import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  filteredCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  filteredCount,
  hasNextPage,
  hasPrevPage,
  onNext,
  onPrev,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-200">

      {/* linha 1 — total à esquerda, por página à direita */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {filteredCount < totalItems ? (
            <>
              <span className="font-medium text-slate-800">{filteredCount}</span>
              {" "}de{" "}
              <span className="font-medium text-slate-800">{totalItems}</span>
              {" "}usuários encontrados
            </>
          ) : (
            <>
              <span className="font-medium text-slate-800">{totalItems}</span>
              {" "}usuários no total
            </>
          )}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Por página</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 w-16 text-sm border border-slate-200 rounded-lg px-2 bg-white text-slate-700 cursor-pointer outline-none"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>

      {/* linha 2 — navegação centralizada */}
      <div className="flex items-center justify-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={!hasPrevPage}
          className="h-8 w-8 p-0 border-slate-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          const isNearCurrent = Math.abs(page - currentPage) <= 1;
          const isEdge = page === 1 || page === totalPages;

          if (!isNearCurrent && !isEdge) {
            if (page === 2 || page === totalPages - 1) {
              return (
                <span key={page} className="text-slate-400 text-sm px-1">…</span>
              );
            }
            return null;
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-8 w-8 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-slate-800 text-white font-medium"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!hasNextPage}
          className="h-8 w-8 p-0 border-slate-200"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

    </div>
  );
}