import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KPICard } from "@/components/dashboard/KPICard";
import {
  Activity,
  TrendingUp,
  Users,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState<"24h" | "7d" | "30d" | "custom">("7d");

  /* ================= RANGE DATA ================= */

  const rangeData = {
    "24h": {
      kpi: {
        comments: "342",
        highIntent: "48",
        replies: "89",
        clicks: "124",
        conversion: "21.4%",
        replyTime: "6min",
      },
      engagement: [
        { date: "6 AM", engagements: 320, leads: 18 },
        { date: "12 PM", engagements: 540, leads: 34 },
        { date: "6 PM", engagements: 780, leads: 52 },
        { date: "12 AM", engagements: 920, leads: 71 },
      ],
    },
    "7d": {
      kpi: {
        comments: "1124",
        highIntent: "127",
        replies: "412",
        clicks: "456",
        conversion: "26.1%",
        replyTime: "8min",
      },
      engagement: [
        { date: "Mon", engagements: 420, leads: 32 },
        { date: "Tue", engagements: 510, leads: 41 },
        { date: "Wed", engagements: 620, leads: 55 },
        { date: "Thu", engagements: 700, leads: 63 },
        { date: "Fri", engagements: 860, leads: 74 },
        { date: "Sat", engagements: 940, leads: 82 },
        { date: "Sun", engagements: 1050, leads: 95 },
      ],
    },
    "30d": {
      kpi: {
        comments: "4982",
        highIntent: "512",
        replies: "1842",
        clicks: "1982",
        conversion: "28.9%",
        replyTime: "9min",
      },
      engagement: [
        { date: "W1", engagements: 3200, leads: 210 },
        { date: "W2", engagements: 3680, leads: 245 },
        { date: "W3", engagements: 4120, leads: 287 },
        { date: "W4", engagements: 4980, leads: 332 },
      ],
    },
    custom: {
      kpi: {
        comments: "860",
        highIntent: "91",
        replies: "233",
        clicks: "312",
        conversion: "24.3%",
        replyTime: "7min",
      },
      engagement: [
        { date: "D1", engagements: 210, leads: 14 },
        { date: "D2", engagements: 340, leads: 22 },
        { date: "D3", engagements: 310, leads: 19 },
        { date: "D4", engagements: 420, leads: 29 },
      ],
    },
  };

  const sentimentData = [
    { name: "Positive", value: 65, color: "hsl(var(--primary))" },
    { name: "Neutral", value: 25, color: "hsl(var(--muted))" },
    { name: "Negative", value: 10, color: "hsl(var(--destructive))" },
  ];

  const platformData = [
    { platform: "LinkedIn", threads: 4200, leads: 120 },
    { platform: "Reddit", threads: 3800, leads: 95 },
    { platform: "X (Twitter)", threads: 2400, leads: 42 },
    { platform: "Quora", threads: 1800, leads: 23 },
    { platform: "YouTube", threads: 647, leads: 7 },
  ];

  const kpiData = [
    { icon: MessageSquare, label: "New Comments", value: rangeData[range].kpi.comments, change: "+23%", trend: "up" as const },
    { icon: AlertCircle, label: "High-Intent (≥70)", value: rangeData[range].kpi.highIntent, change: "+34%", trend: "up" as const },
    { icon: ThumbsUp, label: "Auto Replies Sent", value: rangeData[range].kpi.replies, change: "+18%", trend: "up" as const },
    { icon: Users, label: "Link Clicks", value: rangeData[range].kpi.clicks, change: "+12%", trend: "up" as const },
    { icon: TrendingUp, label: "Engagement→Lead %", value: rangeData[range].kpi.conversion, change: "+2.1%", trend: "up" as const },
    { icon: Activity, label: "Avg Reply Time", value: rangeData[range].kpi.replyTime, change: "-15%", trend: "up" as const },
  ];

  const minutesAgo = (m: number) => `${m} min ago`;

  const exportReport = () => {
    const rows = [["Metric", "Value"], ...kpiData.map(k => [k.label, k.value])];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-${range}.csv`;
    a.click();
  };

  return (
    <div className="p-8 space-y-8 bg-background">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Real-time analytics and performance metrics
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={range} onValueChange={(v) => setRange(v as any)}>
            <SelectTrigger className="w-32 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7d</SelectItem>
              <SelectItem value="30d">Last 30d</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary text-primary-foreground" onClick={exportReport}>
            <Activity className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-bold mb-6">Engagement & Lead Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rangeData[range].engagement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="engagements" stroke="hsl(var(--primary))" />
              <Line dataKey="leads" stroke="hsl(var(--chart-2))" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-bold mb-6">Sentiment Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={sentimentData} dataKey="value" outerRadius={100}>
                {sentimentData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-bold mb-6">Platform Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="threads" fill="hsl(var(--primary))" />
              <Bar dataKey="leads" fill="hsl(var(--chart-2))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-bold mb-6">Intent Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { range: "0-20", count: 45 },
                { range: "21-40", count: 78 },
                { range: "41-60", count: 112 },
                { range: "61-80", count: 89 },
                { range: "81-100", count: 127 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold mb-6">Recent High-Intent Leads</h3>
        {[
          { user: "Sarah Johnson", platform: "LinkedIn", intent: 92, t: 2 },
          { user: "Mike Chen", platform: "Reddit", intent: 88, t: 15 },
          { user: "Emma Wilson", platform: "X", intent: 85, t: 32 },
        ].map((a, i) => (
          <div key={i} className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50">
            <Badge className="bg-primary text-primary-foreground">{a.intent}</Badge>
            <div className="flex-1">
              <div className="font-semibold">{a.user}</div>
              <div className="text-xs text-muted-foreground">
                via {a.platform} • {minutesAgo(a.t)}
              </div>
            </div>
            <Button size="sm" variant="secondary" onClick={() => navigate("/leads-pipeline")}>
              Engage
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default DashboardOverview;
