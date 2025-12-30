import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, ExternalLink, Copy, Send, UserPlus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DetailPaneProps {
  comment: {
    id: string;
    platform: string;
    author: string;
    followers: number;
    timestamp: string;
    content: string;
    intentScore: number;
    sentiment: string;
    keywords: string[];
    replyStatus: string;
    replyText?: string;
    brandLink?: string;
    clicks: number;
  };
  onClose: () => void;
}

export const DetailPane = ({ comment, onClose }: DetailPaneProps) => {
  const getIntentColor = (score: number) => {
    if (score >= 80) return "bg-green-500 text-white";
    if (score >= 50) return "bg-chart-2 text-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <Card className="w-full max-w-2xl h-full bg-card border-border flex flex-col">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="text-xl font-bold">Comment Detail</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Author Info */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold text-lg">{comment.author}</div>
                <div className="text-sm text-muted-foreground">
                  {comment.followers.toLocaleString()} followers • {comment.platform}
                </div>
              </div>
              <Badge variant="secondary">{comment.timestamp}</Badge>
            </div>
          </div>

          <Separator />

          {/* Comment Content */}
          <div>
            <Label className="text-sm font-semibold mb-2">Comment</Label>
            <p className="text-foreground leading-relaxed">{comment.content}</p>
          </div>

          <Separator />

          {/* Intent & Sentiment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold mb-2">Intent Score</Label>
              <Badge className={getIntentColor(comment.intentScore)}>
                {comment.intentScore}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2">Sentiment</Label>
              <Badge variant="secondary">{comment.sentiment}</Badge>
            </div>
          </div>

          {/* Keywords */}
          <div>
            <Label className="text-sm font-semibold mb-2">Matched Keywords</Label>
            <div className="flex flex-wrap gap-2">
              {comment.keywords.map((keyword, i) => (
                <Badge key={i} variant="outline" className="border-primary/30">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Auto Reply */}
          {comment.replyText && (
            <>
              <div>
                <Label className="text-sm font-semibold mb-2">Auto Reply</Label>
                <Card className="p-4 bg-background border-border">
                  <p className="text-sm text-foreground">{comment.replyText}</p>
                </Card>
                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    variant={comment.replyStatus === "Sent" ? "default" : "secondary"}
                    className={comment.replyStatus === "Sent" ? "bg-green-500" : ""}
                  >
                    {comment.replyStatus}
                  </Badge>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Brand Link Tracking */}
          {comment.brandLink && (
            <>
              <div>
                <Label className="text-sm font-semibold mb-2">Brand Link Tracking</Label>
                <Card className="p-4 bg-background border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Short URL</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">{comment.brandLink}</span>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Clicks</span>
                    <span className="text-sm font-bold">{comment.clicks}</span>
                  </div>
                </Card>
              </div>
              <Separator />
            </>
          )}

          {/* Suggested Replies */}
          <div>
            <Label className="text-sm font-semibold mb-3">Suggested AI Replies</Label>
            <div className="space-y-3">
              {[
                {
                  label: "Short & Friendly",
                  text: "Thanks for sharing! We'd love to help. Check out Leadequator: [link]",
                },
                {
                  label: "Helpful & Educational",
                  text: "Great question! We built Leadequator to solve exactly this. It monitors conversations and converts them into leads automatically.",
                },
                {
                  label: "Strong CTA",
                  text: "Looking for a solution? Leadequator can help! Book a demo here: [link]",
                },
              ].map((reply, i) => (
                <Card key={i} className="p-3 bg-background border-border">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {reply.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground mb-3">{reply.text}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">
                      Edit
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground">
                      <Send className="mr-2 h-3 w-3" />
                      Send
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Action Buttons */}
      <div className="p-6 border-t border-border flex gap-2">
        <Button variant="secondary" className="flex-1">
          <Copy className="mr-2 h-4 w-4" />
          Copy Reply
        </Button>
        <Button className="flex-1 bg-primary text-primary-foreground">
          <UserPlus className="mr-2 h-4 w-4" />
          Save as Lead
        </Button>
      </div>
    </Card>
  );
};

const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`block font-medium ${className}`}>{children}</div>
);
