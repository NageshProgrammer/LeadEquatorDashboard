import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Sparkles, ExternalLink } from "lucide-react";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { DetailPane } from "@/components/dashboard/DetailPane";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MonitorStream = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [threads, setThreads] = useState<any[]>([
    {
      id: 1,
      platform: "LinkedIn",
      user: "Sarah Johnson",
      avatar: "SJ",
      intent: 92,
      sentiment: "Positive",
      timestamp: "2 minutes ago",
      content:
        "We're looking for a PR automation tool that can monitor LinkedIn conversations and generate contextual replies.",
      engagement: { likes: 24, comments: 8 },
      keywords: ["PR automation", "LinkedIn"],
    },
    {
      id: 2,
      platform: "Reddit",
      user: "growth_hacker_mike",
      avatar: "GM",
      intent: 88,
      sentiment: "Neutral",
      timestamp: "15 minutes ago",
      content:
        "Has anyone successfully generated B2B leads without paid ads?",
      engagement: { likes: 156, comments: 42 },
      keywords: ["B2B leads", "organic"],
    },
  ]);

  const getIntentColor = (intent: number) => {
    if (intent >= 85) return "bg-primary text-primary-foreground";
    if (intent >= 70) return "bg-chart-2 text-foreground";
    return "bg-muted text-muted-foreground";
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "Positive") return "text-green-500";
    if (sentiment === "Negative") return "text-destructive";
    return "text-muted-foreground";
  };

  const openExternalLink = (platform: string) => {
    const links: Record<string, string> = {
      LinkedIn: "https://linkedin.com",
      Reddit: "https://reddit.com",
      "X (Twitter)": "https://x.com",
      Quora: "https://quora.com",
      YouTube: "https://youtube.com",
    };
    window.open(links[platform] || "#", "_blank");
  };

  const openDetailPane = (thread: any) => {
    setSelectedComment({
      id: thread.id.toString(),
      platform: thread.platform,
      author: thread.user,
      followers: thread.engagement.likes,
      timestamp: thread.timestamp,
      content: thread.content,
      intentScore: thread.intent,
      sentiment: thread.sentiment,
      keywords: thread.keywords,
      replyStatus: "Draft Generated",
      clicks: 0,
    });
  };

  const loadMore = () => {
    setThreads((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        platform: "Quora",
        user: "David Martinez",
        avatar: "DM",
        intent: 78,
        sentiment: "Positive",
        timestamp: "1 hour ago",
        content:
          "What's the best way to track purchase intent in social conversations?",
        engagement: { likes: 12, comments: 5 },
        keywords: ["purchase intent", "B2B SaaS"],
      },
    ]);
  };

  return (
    <div className="p-8 bg-background">
      {/* ✅ Horizontal scroll ONLY when detail pane is open */}
      <div
        className={`flex gap-6 ${
          selectedComment ? "overflow-x-auto" : "overflow-x-hidden"
        }`}
      >
        {showFilters && (
          <div className="w-80 flex-shrink-0">
            <FilterPanel onClose={() => setShowFilters(false)} />
          </div>
        )}

        {/* Main table area */}
        <div className="flex-1 space-y-6 min-w-[900px]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Monitor Stream</h1>
              <p className="text-muted-foreground">
                Real-time feed of high-value conversations across platforms
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>
          </div>

          <Card className="p-4 bg-card border-border">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search conversations, keywords, users..."
                  className="pl-10 bg-background"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48 bg-background">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="high">
                <SelectTrigger className="w-48 bg-background">
                  <SelectValue placeholder="Intent Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <Card className="bg-card border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Intent</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>Reply</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threads.map((thread) => (
                  <TableRow
                    key={thread.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => openDetailPane(thread)}
                  >
                    <TableCell className="text-xs text-muted-foreground">
                      {thread.timestamp}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{thread.platform}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{thread.user}</div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate text-sm">{thread.content}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getIntentColor(thread.intent)}>
                        {thread.intent}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-sm ${getSentimentColor(
                          thread.sentiment
                        )}`}
                      >
                        {thread.sentiment}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Not Sent</Badge>
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            openExternalLink(thread.platform);
                          }}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDetailPane(thread);
                          }}
                        >
                          <Sparkles className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="text-center">
            <Button variant="secondary" size="lg" onClick={loadMore}>
              Load More Conversations
            </Button>
          </div>
        </div>

        {/* Detail Pane */}
        {selectedComment && (
          <div className="w-[600px] flex-shrink-0">
            <DetailPane
              comment={selectedComment}
              onClose={() => setSelectedComment(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitorStream;
