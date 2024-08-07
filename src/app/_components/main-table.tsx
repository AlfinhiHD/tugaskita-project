"use client";

import React, { useState, useMemo, useEffect } from "react";
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

const MainTable = ({
  columns,
  data,
  searchable = false,
  itemsPerPage = 10,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [originalData, setOriginalData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setOriginalData(data);
    setCurrentPage(1);
  }, [data]);

  const sortedAndFilteredData = useMemo(() => {
    let filteredData = searchable
      ? originalData.filter((item) =>
          columns.some((column) =>
            String(item[column.key])
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
        )
      : originalData;

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
  }, [originalData, searchTerm, sortConfig, columns, searchable]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        setSortConfig({ key, direction: "descending" });
      } else if (sortConfig.direction === "descending") {
        setSortConfig({ key: null, direction: null });
      } else {
        setSortConfig({ key, direction: "ascending" });
      }
    } else {
      setSortConfig({ key, direction: "ascending" });
    }
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
    <div className="mt-12">
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                onClick={() => column.sortable && handleSort(column.key)}
                className={column.sortable ? "cursor-pointer" : ""}
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
          {paginatedData.map((item, index) => (
            <TableRow key={item.id || index}>
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render ? column.render(item) : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
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
    </div>
  );
};

export default MainTable;
