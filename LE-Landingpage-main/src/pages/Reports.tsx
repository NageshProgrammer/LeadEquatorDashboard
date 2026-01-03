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

const Reports = () => {
  /* -------------------- STATES -------------------- */

  // Quick export
  const [dateRange, setDateRange] = useState("7d");
  const [dataType, setDataType] = useState("comments");
  const [format, setFormat] = useState("csv");
  const [loading, setLoading] = useState(false);

  // Custom report
  const [openCustomReport, setOpenCustomReport] = useState(false);
  const [reportName, setReportName] = useState("");
  const [customType, setCustomType] = useState("comments");
  const [customRange, setCustomRange] = useState("7d");
  const [customFormat, setCustomFormat] = useState("csv");

  // Scheduled report edit
  const [editingReport, setEditingReport] = useState<any>(null);

  /* -------------------- DATA -------------------- */

  const scheduledReports = [
    {
      name: "Weekly Performance Summary",
      frequency: "Every Monday, 9:00 AM",
      recipients: "team@acmecorp.com",
      lastSent: "2 days ago",
      status: "Active",
    },
    {
      name: "Monthly Executive Dashboard",
      frequency: "1st of each month",
      recipients: "executives@acmecorp.com",
      lastSent: "15 days ago",
      status: "Active",
    },
  ];

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

  /* -------------------- HELPERS -------------------- */

  const downloadFile = (content: string, fileName: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  /* -------------------- ACTIONS -------------------- */

  const handleQuickExport = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const data = `dateRange,dataType,generatedAt
${dateRange},${dataType},${new Date().toISOString()}`;

    downloadFile(data, `${dataType}-quick-export.${format}`, "text/csv");

    setLoading(false);
    alert("Quick export completed");
  };

  const generateCustomReport = () => {
    if (!reportName.trim()) {
      alert("Please enter report name");
      return;
    }

    const content = `
Report Name: ${reportName}
Data Type: ${customType}
Date Range: ${customRange}
Format: ${customFormat}
Generated At: ${new Date().toLocaleString()}
`;

    downloadFile(
      content,
      `${reportName.replace(/\s/g, "_")}.${customFormat}`,
      "text/plain"
    );

    setOpenCustomReport(false);
    setReportName("");
    alert("Custom report generated");
  };

  const exportReport = (name: string) => {
    downloadFile(
      `Report: ${name}\nGenerated: ${new Date().toLocaleString()}`,
      `${name.replace(/\s/g, "_")}.csv`,
      "text/csv"
    );
  };

  /* -------------------- UI -------------------- */

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

          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comments">Comments</SelectItem>
              <SelectItem value="leads">Leads</SelectItem>
              <SelectItem value="replies">Replies</SelectItem>
            </SelectContent>
          </Select>

          <Select value={format} onValueChange={setFormat}>
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

      {/* Create Custom Report Modal */}
      <Dialog open={openCustomReport} onOpenChange={setOpenCustomReport}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Custom Report</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">

            {/* FIXED INPUT */}
            <input
              className="w-full border rounded px-3 py-2 bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Report name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />

            <Select value={customType} onValueChange={setCustomType}>
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

            <Select value={customFormat} onValueChange={setCustomFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="txt">TXT</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setOpenCustomReport(false)}>
                Cancel
              </Button>
              <Button onClick={generateCustomReport}>
                Generate
              </Button>
            </div>

          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Reports;
