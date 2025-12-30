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
import { Download, Mail, FileText, Calendar } from "lucide-react";

const Reports = () => {
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
    {
      name: "Daily High-Intent Digest",
      frequency: "Daily, 8:00 AM",
      recipients: "sales@acmecorp.com",
      lastSent: "12 hours ago",
      status: "Active",
    },
  ];

  const exportableReports = [
    {
      name: "Comment Export (All Fields)",
      description: "Full dataset with timestamps, intent, sentiment, replies",
      format: "CSV / JSON",
    },
    {
      name: "Lead Tracking Report",
      description: "Leads with click attribution and CRM sync status",
      format: "CSV / Excel",
    },
    {
      name: "Template Performance",
      description: "Auto-reply templates with send count, CTR, conversion",
      format: "CSV",
    },
    {
      name: "Platform Breakdown",
      description: "Comments, replies, and leads by platform",
      format: "PDF / CSV",
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Exports</h1>
          <p className="text-muted-foreground">
            Generate custom reports and schedule automated summaries
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <FileText className="mr-2 h-4 w-4" />
          Create Custom Report
        </Button>
      </div>

      {/* Quick Export */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold mb-6">Quick Export</h3>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Date Range</label>
            <Select defaultValue="7d">
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Data Type</label>
            <Select defaultValue="comments">
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comments">Comments</SelectItem>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="replies">Auto Replies</SelectItem>
                <SelectItem value="clicks">Link Clicks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Format</label>
            <Select defaultValue="csv">
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Scheduled Reports */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Scheduled Reports</h3>
          <Button variant="secondary">
            <Calendar className="mr-2 h-4 w-4" />
            New Schedule
          </Button>
        </div>
        <div className="space-y-4">
          {scheduledReports.map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold">{report.name}</h4>
                  <Badge
                    variant={report.status === "Active" ? "default" : "secondary"}
                    className={report.status === "Active" ? "bg-green-500" : ""}
                  >
                    {report.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {report.frequency}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {report.recipients}
                  </div>
                  <div>Last sent: {report.lastSent}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
                <Button variant="secondary" size="sm">
                  Send Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Exportable Reports */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold mb-6">Exportable Reports</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {exportableReports.map((report, index) => (
            <Card key={index} className="p-4 bg-background border-border">
              <div className="mb-3">
                <h4 className="font-semibold mb-1">{report.name}</h4>
                <p className="text-sm text-muted-foreground">{report.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{report.format}</Badge>
                <Button size="sm" className="bg-primary text-primary-foreground">
                  <Download className="mr-2 h-3 w-3" />
                  Export
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Reports;
