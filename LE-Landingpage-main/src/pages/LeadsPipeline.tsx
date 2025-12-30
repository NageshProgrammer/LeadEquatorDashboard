import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Download } from "lucide-react";

type Lead = {
  _id: string;
  leadId: string;
  name: string;
  company: string;
  platform: string;
  intent: number;
  status: string;
  value: number;
  source: string;
  createdAt: string;
};

const LeadsPipeline = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/lead-pipeline");
        const json = await res.json();
        setLeads(json.data || []);
      } catch (error) {
        console.error("Failed to fetch leads pipeline");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500/20 text-blue-500";
      case "Contacted":
        return "bg-yellow-500/20 text-yellow-500";
      case "Qualified":
        return "bg-purple-500/20 text-purple-500";
      case "Demo Scheduled":
        return "bg-green-500/20 text-green-500";
      case "Negotiating":
        return "bg-primary/20 text-primary";
      case "Closed Won":
        return "bg-green-600/20 text-green-600";
      case "Closed Lost":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getIntentColor = (intent: number) => {
    if (intent >= 85) return "bg-primary text-primary-foreground";
    if (intent >= 70) return "bg-chart-2 text-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Leads Pipeline</h1>
            <p className="text-muted-foreground">
              Qualified leads from social conversations with CRM sync
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Sync to CRM
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Leads", value: leads.length },
            {
              label: "Pipeline Value",
              value: `$${leads.reduce((sum, l) => sum + l.value, 0).toLocaleString()}`,
            },
            {
              label: "Avg Deal Size",
              value:
                leads.length > 0
                  ? `$${Math.round(
                      leads.reduce((sum, l) => sum + l.value, 0) / leads.length
                    ).toLocaleString()}`
                  : "$0",
            },
            { label: "Win Rate", value: "23%" },
          ].map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="text-3xl font-bold mb-1 text-primary">
                {stat.value}
              </div>
              <div className="text-sm font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card className="bg-card border-border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading pipeline data...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead ID</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Intent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead._id}>
                      <TableCell className="font-mono text-primary">
                        {lead.leadId}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{lead.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {lead.company}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{lead.platform}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getIntentColor(lead.intent)}>
                          {lead.intent}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${lead.value.toLocaleString()}
                      </TableCell>
                      <TableCell className="max-w-48 truncate text-sm text-muted-foreground">
                        {lead.source}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        {/* CRM Sync Status */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">CRM Sync Active</h3>
              <p className="text-sm text-muted-foreground">
                Last synced: 2 minutes ago • Syncing to Salesforce
              </p>
            </div>
            <Button variant="secondary">Configure Sync</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LeadsPipeline;
