import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ExportData {
  columns: string[];
  rows: Record<string, unknown>[];
  query?: string;
  sql?: string;
}

export const exportToCSV = (data: ExportData, filename: string = 'sqltalk-export') => {
  const { columns, rows } = data;
  
  const csvContent = [
    columns.join(','),
    ...rows.map(row => columns.map(col => {
      const value = row[col];
      // Escape quotes and wrap in quotes if contains comma
      const stringValue = String(value ?? '');
      return stringValue.includes(',') || stringValue.includes('"')
        ? `"${stringValue.replace(/"/g, '""')}"`
        : stringValue;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
};

export const exportToExcel = (data: ExportData, filename: string = 'sqltalk-export') => {
  const { columns, rows } = data;
  
  const worksheetData = [
    columns,
    ...rows.map(row => columns.map(col => row[col]))
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');

  // Add query info sheet if available
  if (data.query || data.sql) {
    const infoData = [];
    if (data.query) infoData.push(['Query', data.query]);
    if (data.sql) infoData.push(['Generated SQL', data.sql]);
    infoData.push(['Export Date', new Date().toISOString()]);
    infoData.push(['Row Count', rows.length]);
    
    const infoSheet = XLSX.utils.aoa_to_sheet(infoData);
    XLSX.utils.book_append_sheet(workbook, infoSheet, 'Query Info');
  }

  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = (data: ExportData, filename: string = 'sqltalk-export') => {
  const { columns, rows, query, sql } = data;
  
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(6, 182, 212); // Cyan color
  doc.text('SQLTalk Analytics Report', 14, 22);
  
  // Query info
  let yPos = 35;
  doc.setFontSize(10);
  doc.setTextColor(100);
  
  if (query) {
    doc.text(`Query: ${query}`, 14, yPos);
    yPos += 7;
  }
  
  if (sql) {
    doc.setFontSize(8);
    doc.text('Generated SQL:', 14, yPos);
    yPos += 5;
    
    // Wrap SQL text
    const sqlLines = doc.splitTextToSize(sql, 180);
    doc.setFont('courier', 'normal');
    doc.text(sqlLines, 14, yPos);
    yPos += sqlLines.length * 4 + 10;
    doc.setFont('helvetica', 'normal');
  }
  
  // Metadata
  doc.setFontSize(9);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, yPos);
  doc.text(`Total Rows: ${rows.length}`, 120, yPos);
  yPos += 10;

  // Table
  autoTable(doc, {
    startY: yPos,
    head: [columns],
    body: rows.map(row => columns.map(col => String(row[col] ?? ''))),
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [6, 182, 212],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });

  doc.save(`${filename}.pdf`);
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
