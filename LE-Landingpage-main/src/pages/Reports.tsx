import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, FileText } from "lucide-react";

/* ================= TYPES ================= */

type DataType = "comments" | "leads" | "replies";
type ExportFormat = "csv" | "json" | "txt";

/* ================= COMPONENT ================= */

const Reports = () => {
  /* ---------- Quick Export ---------- */
  const [dateRange, setDateRange] = useState("7d");
  const [dataType, setDataType] = useState<DataType>("comments");
  const [format, setFormat] = useState<ExportFormat>("csv");
  const [loading, setLoading] = useState(false);

  /* ---------- Custom Report ---------- */
  const [openCustomReport, setOpenCustomReport] = useState(false);
  const [reportName, setReportName] = useState("");
  const [customType, setCustomType] = useState<DataType>("comments");
  const [customRange, setCustomRange] = useState("7d");
  const [customFormat, setCustomFormat] = useState<ExportFormat>("csv");

  /* ---------- Static Config ---------- */

  const exportableReports = [
    {
      name: "Comment Export (All Fields)",
      description: "Full dataset with timestamps, intent, sentiment",
      format: "CSV / JSON",
    },
    {
      name: "Lead Tracking Report",
      description: "Leads with attribution and CRM sync status",
      format: "CSV / Excel",
    },
  ];

  /* ---------- Helpers ---------- */

  const downloadFile = (content: string, fileName: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateContent = (
    type: DataType,
    range: string,
    format: ExportFormat
  ) => {
    const payload = {
      type,
      range,
      generatedAt: new Date().toISOString(),
    };

    if (format === "json") return JSON.stringify(payload, null, 2);
    if (format === "csv")
      return `type,range,generatedAt\n${type},${range},${payload.generatedAt}`;

    return `
Report Type: ${type}
Date Range: ${range}
Generated At: ${payload.generatedAt}
`;
  };

  /* ---------- Actions ---------- */

  const handleQuickExport = async () => {
    setLoading(true);

    const content = generateContent(dataType, dateRange, format);
    downloadFile(
      content,
      `${dataType}-${dateRange}.${format}`,
      format === "json" ? "application/json" : "text/plain"
    );

    setLoading(false);
  };

  const generateCustomReport = () => {
    if (!reportName.trim()) return;

    const content = generateContent(
      customType,
      customRange,
      customFormat
    );

    downloadFile(
      content,
      `${reportName.replace(/\s+/g, "_")}.${customFormat}`,
      "text/plain"
    );

    setOpenCustomReport(false);
    setReportName("");
  };

  const exportReport = (name: string) => {
    const content = generateContent("leads", "all", "csv");
    downloadFile(
      content,
      `${name.replace(/\s+/g, "_")}.csv`,
      "text/csv"
    );
  };

  /* ================= UI (UNCHANGED) ================= */

  return (
    <div className="p-8 space-y-8 bg-background">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Exports</h1>
          <p className="text-muted-foreground">
            Generate reports and schedule automated summaries
          </p>
        </div>
        <Button onClick={() => setOpenCustomReport(true)}>
          <FileText className="mr-2 h-4 w-4" />
          Create Custom Report
        </Button>
      </div>

      {/* Quick Export */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Quick Export</h3>
        <div className="flex gap-4 items-end">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={dataType}
            onValueChange={(v) => setDataType(v as DataType)}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comments">Comments</SelectItem>
              <SelectItem value="leads">Leads</SelectItem>
              <SelectItem value="replies">Replies</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={format}
            onValueChange={(v) => setFormat(v as ExportFormat)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleQuickExport} disabled={loading}>
            <Download className="mr-2 h-4 w-4" />
            {loading ? "Exporting..." : "Export"}
          </Button>
        </div>
      </Card>

      {/* Exportable Reports */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Exportable Reports</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {exportableReports.map((r, i) => (
            <Card key={i} className="p-4">
              <h4 className="font-semibold">{r.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {r.description}
              </p>
              <div className="flex justify-between">
                <Badge variant="outline">{r.format}</Badge>
                <Button size="sm" onClick={() => exportReport(r.name)}>
                  <Download className="mr-2 h-3 w-3" />
                  Export
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Custom Report Modal */}
      <Dialog open={openCustomReport} onOpenChange={setOpenCustomReport}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Custom Report</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <input
              className="w-full border rounded px-3 py-2 bg-background"
              placeholder="Report name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />

            <Select
              value={customType}
              onValueChange={(v) => setCustomType(v as DataType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comments">Comments</SelectItem>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="replies">Replies</SelectItem>
              </SelectContent>
            </Select>

            <Select value={customRange} onValueChange={setCustomRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={customFormat}
              onValueChange={(v) => setCustomFormat(v as ExportFormat)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="txt">TXT</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setOpenCustomReport(false)}
              >
                Cancel
              </Button>
              <Button onClick={generateCustomReport}>Generate</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
