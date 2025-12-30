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
import { MessageSquare, Send, MousePointer, Filter } from "lucide-react";
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CommentTimeline = () => {
  // Timeline data: comment → reply → click events
  const timelineData = [
    { time: "09:00", comments: 12, replies: 8, clicks: 3 },
    { time: "10:00", comments: 18, replies: 15, clicks: 7 },
    { time: "11:00", comments: 24, replies: 20, clicks: 12 },
    { time: "12:00", comments: 15, replies: 12, clicks: 8 },
    { time: "13:00", comments: 20, replies: 16, clicks: 10 },
    { time: "14:00", comments: 28, replies: 24, clicks: 15 },
    { time: "15:00", comments: 22, replies: 18, clicks: 11 },
    { time: "16:00", comments: 16, replies: 13, clicks: 6 },
  ];

  // Event scatter data for detailed view
  const eventData = [
    { time: 1, type: "comment", platform: "LinkedIn", intent: 92 },
    { time: 2, type: "reply", platform: "LinkedIn", intent: 92 },
    { time: 3, type: "click", platform: "LinkedIn", intent: 92 },
    { time: 4, type: "comment", platform: "Reddit", intent: 78 },
    { time: 5, type: "reply", platform: "Reddit", intent: 78 },
    { time: 6, type: "comment", platform: "X", intent: 85 },
    { time: 7, type: "reply", platform: "X", intent: 85 },
    { time: 8, type: "click", platform: "X", intent: 85 },
    { time: 9, type: "comment", platform: "LinkedIn", intent: 95 },
    { time: 10, type: "reply", platform: "LinkedIn", intent: 95 },
    { time: 11, type: "click", platform: "LinkedIn", intent: 95 },
    { time: 12, type: "click", platform: "LinkedIn", intent: 95 },
  ];

  const getEventColor = (type: string) => {
    if (type === "comment") return "hsl(var(--primary))";
    if (type === "reply") return "hsl(var(--chart-2))";
    return "hsl(var(--chart-3))";
  };

  const recentEvents = [
    {
      time: "14:32",
      platform: "LinkedIn",
      author: "Sarah Johnson",
      event: "Comment → Reply → Click",
      duration: "8 minutes",
      intent: 92,
    },
    {
      time: "14:18",
      platform: "Reddit",
      author: "Mike Chen",
      event: "Comment → Reply",
      duration: "5 minutes",
      intent: 88,
    },
    {
      time: "13:45",
      platform: "X",
      author: "Emma Wilson",
      event: "Comment → Reply → Click",
      duration: "12 minutes",
      intent: 85,
    },
    {
      time: "13:20",
      platform: "LinkedIn",
      author: "David Martinez",
      event: "Comment → Reply → Click → Click",
      duration: "25 minutes",
      intent: 95,
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Comment Timeline</h1>
          <p className="text-muted-foreground">
            Visualize the flow: Comment → Auto Reply → Link Clicks
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="24h">
            <SelectTrigger className="w-32 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7d</SelectItem>
              <SelectItem value="30d">Last 30d</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Event Flow Chart */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold mb-6">Event Flow Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="comments"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Comments"
            />
            <Line
              type="monotone"
              dataKey="replies"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Replies"
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              name="Clicks"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Event Scatter Plot */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold mb-6">Individual Event Timeline</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-sm">Comment</span>
          </div>
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4" style={{ color: "hsl(var(--chart-2))" }} />
            <span className="text-sm">Auto Reply</span>
          </div>
          <div className="flex items-center gap-2">
            <MousePointer className="h-4 w-4" style={{ color: "hsl(var(--chart-3))" }} />
            <span className="text-sm">Link Click</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              name="Time"
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              dataKey="intent"
              name="Intent"
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Scatter data={eventData} fill="hsl(var(--primary))">
              {eventData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getEventColor(entry.type)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Event Sequences */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold mb-6">Recent Event Sequences</h3>
        <div className="space-y-4">
          {recentEvents.map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Badge
                  className={
                    event.intent >= 85
                      ? "bg-green-500 text-white"
                      : "bg-chart-2 text-foreground"
                  }
                >
                  {event.intent}
                </Badge>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{event.author}</span>
                    <Badge variant="secondary" className="text-xs">
                      {event.platform}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{event.time}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{event.event}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{event.duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CommentTimeline;
