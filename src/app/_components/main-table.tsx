"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import ScrollIndicator from "./scroll-indicator";

const MainTable = ({
  columns,
  data,
  searchable = false,
  itemsPerPage = 10,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);

  const tableRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (tableRef.current) {
        setIsScrollable(tableRef.current.scrollWidth > tableRef.current.clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);

    return () => window.removeEventListener('resize', checkScrollable);
  }, [data]);


  const sortedAndFilteredData = useMemo(() => {
    let filteredData = searchable
      ? data.filter((item) =>
          columns.some((column) =>
            String(item[column.key])
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
        )
      : [...data];

    if (sortConfig.key !== null) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredData;
  }, [data, searchTerm, sortConfig, columns, searchable]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        if (prevConfig.direction === "ascending") {
          return { key, direction: "descending" };
        }
        return { key: null, direction: null };
      }
      return { key, direction: "ascending" };
    });
  };

  const renderSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === "ascending" ? (
        <ChevronUp size={16} />
      ) : (
        <ChevronDown size={16} />
      );
    }
    return <div className="w-4"></div>;
  };

  return (
    <div className="mt-6">
      {searchable && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="relative overflow-x-auto" ref={tableRef}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No</TableHead>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`${column.sortable ? "cursor-pointer" : ""} ${
                    column.className || ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {column.header}
                    {column.sortable && renderSortIcon(column.key)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 || sortedAndFilteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <Image
                      src="/assets/images/zerodata.jpg"
                      alt="Data tidak tersedia"
                      width={300}
                      height={300}
                    />
                    <p className="mt-4 text-lg font-medium text-gray-600">
                      Maaf, data tidak tersedia.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={column.className || ""}
                    >
                      {column.render ? column.render(item) : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {isScrollable && <ScrollIndicator />}
      </div>

      {data.length !== 0 && sortedAndFilteredData.length !== 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-2 sm:space-y-0">
          <div className="text-sm font-medium">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, sortedAndFilteredData.length)}{" "}
            dari {sortedAndFilteredData.length} data
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainTable;
