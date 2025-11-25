import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Search, Filter, Download, MoreHorizontal, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import EmptyState from '../common/EmptyState';
import { formatDate, formatCurrency, formatPercentage } from '../../utils/formatters';

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: 'date' | 'currency' | 'percentage' | 'number';
}

interface EnhancedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onRowClick?: (row: T, index: number) => void;
  onSelectionChange?: (selectedRows: T[]) => void;
  emptyState?: {
    title: string;
    description: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  className?: string;
}

function EnhancedTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  searchable = false,
  filterable = false,
  exportable = false,
  selectable = false,
  pagination = false,
  pageSize = 10,
  onRowClick,
  onSelectionChange,
  emptyState,
  className = ''
}: EnhancedTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Apply search and sort
  const processedData = useMemo(() => {
    let filtered = [...data];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(row =>
        columns.some(col => {
          const value = row[col.key];
          return value?.toString().toLowerCase().includes(search.toLowerCase());
        })
      );
    }

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, search, sortConfig, columns]);

  // Paginated data
  const paginatedData = useMemo(() => {
    if (!pagination) return processedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return processedData.slice(startIndex, startIndex + pageSize);
  }, [processedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  const handleSort = (key: keyof T) => {
    const column = columns.find(col => col.key === key);
    if (!column?.sortable) return;

    setSortConfig(current => {
      if (current?.key === key) {
        return current.direction === 'asc' 
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const handleRowSelect = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
    
    if (onSelectionChange) {
      const selectedData = Array.from(newSelected).map(i => paginatedData[i]);
      onSelectionChange(selectedData);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    } else {
      const allIndices = new Set(paginatedData.map((_, index) => index));
      setSelectedRows(allIndices);
      onSelectionChange?.(paginatedData);
    }
  };

  const handleExport = () => {
    try {
      // Get column headers
      const headers = columns.map(col => col.header).join(',');
      
      // Convert data to CSV rows
      const rows = processedData.map(row =>
        columns.map(col => {
          let value = row[col.key];
          
          // Format value based on column formatter
          if (col.formatter && value != null) {
            switch (col.formatter) {
              case 'date':
                value = new Date(value).toLocaleDateString();
                break;
              case 'currency':
                value = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                break;
              case 'percentage':
                value = `${value}%`;
                break;
              case 'number':
                value = typeof value === 'number' ? value.toLocaleString() : value;
                break;
            }
          }
          
          // Escape commas and quotes in CSV
          const stringValue = value?.toString() || '';
          if (stringValue.includes(',') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      );
      
      const csvContent = [headers, ...rows].join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `export-${new Date().toISOString().split('T')[0]}.csv`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const formatCellValue = (value: any, formatter?: string) => {
    if (value == null) return '-';
    
    switch (formatter) {
      case 'date':
        return formatDate(value);
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      default:
        return value.toString();
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header Controls */}
      {(searchable || filterable || exportable) && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-3">
              {searchable && (
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64"
                />
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {exportable && (
                <Button 
                  onClick={handleExport}
                  className="flex items-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                    column.align === 'center' ? 'text-center' :
                    column.align === 'right' ? 'text-right' : 'text-left'
                  } ${column.sortable ? 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-600' : ''}`}
                  style={column.width ? { width: column.width } : undefined}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={`h-3 w-3 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-400'
                          }`}
                        />
                        <ChevronDown 
                          className={`h-3 w-3 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-400'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {onRowClick && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                    ${onRowClick ? 'cursor-pointer' : ''}
                    ${selectedRows.has(index) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  `}
                  onClick={() => onRowClick?.(row, index)}
                >
                  {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(index)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleRowSelect(index);
                        }}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td 
                      key={column.key as string} 
                      className={`px-6 py-4 whitespace-nowrap ${
                        column.align === 'center' ? 'text-center' :
                        column.align === 'right' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {column.render ? 
                        column.render(row[column.key], row, index) : 
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatCellValue(row[column.key], column.formatter)}
                        </span>
                      }
                    </td>
                  ))}
                  {onRowClick && (
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (onRowClick ? 1 : 0)} className="px-6 py-12 text-center">
                  {emptyState ? (
                    <EmptyState
                      title={emptyState.title}
                      description={emptyState.description}
                      action={emptyState.action}
                    />
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-lg font-medium mb-2">No data available</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnhancedTable;