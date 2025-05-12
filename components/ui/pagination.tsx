import React from "react";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
}

export function Pagination({ 
  totalPages, 
  currentPage, 
  onPageChange,
  showPageNumbers = true
}: PaginationProps) {
  // Handle previous page
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  // Handle next page
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  // Get page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    if (currentPage < 2) {
      return [0, 1, 2, '...', totalPages - 1];
    }

    if (currentPage > totalPages - 3) {
      return [0, '...', totalPages - 3, totalPages - 2, totalPages - 1];
    }

    return [
      0,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages - 1,
    ];
  };

  return (
    <div className="flex items-center gap-1">
      <Button 
        variant="outline" 
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className="h-8 w-8 p-0"
      >
        <IconChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      
      {showPageNumbers && getPageNumbers().map((page, i) => (
        page === '...' ? (
          <div key={`ellipsis-${i}`} className="px-2 text-sm text-muted-foreground">
            ...
          </div>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className="h-8 w-8 p-0"
          >
            {Number(page) + 1}
          </Button>
        )
      ))}
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
        className="h-8 w-8 p-0"
      >
        <IconChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
