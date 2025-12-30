import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Target, Zap, Shield, TrendingUp } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-0" />
        
        <div className="container mx-auto px-4 z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Replace paid reach with{" "}
            <span className="text-primary">earned influence</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            AI that automates PR engagement, detects purchase intent, and converts
            organic conversations into real leads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30 animate-glow-pulse"
            >
              Request Pilot <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <NavLink to="/dashboard">See Dashboard</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Turn Conversations Into <span className="text-primary">Revenue</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all hover:scale-105 bg-background border-border">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">AI Engagement</h3>
              <p className="text-muted-foreground">
                Automated monitoring of high-value conversations across LinkedIn,
                Quora, Reddit, X, and YouTube. AI-powered responses that sound
                human and contextual.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:scale-105 bg-background border-border">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Intent Lead Capture</h3>
              <p className="text-muted-foreground">
                Real-time purchase intent scoring (0-100) identifies ready-to-buy
                prospects. Automatic lead qualification and CRM sync for immediate
                follow-up.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:scale-105 bg-background border-border">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Competitor Conversion</h3>
              <p className="text-muted-foreground">
                Monitor competitor mentions and intercept dissatisfied customers.
                Turn competitor complaints into your opportunities with smart
                positioning.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            From Noise to <span className="text-primary">Qualified Leads</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Monitor",
                desc: "Track high-follower conversations across 5 platforms in real-time",
              },
              {
                step: "02",
                title: "Analyze",
                desc: "AI detects purchase intent and scores lead quality (0-100)",
              },
              {
                step: "03",
                title: "Engage",
                desc: "Generate contextual replies or auto-respond with brand voice",
              },
              {
                step: "04",
                title: "Convert",
                desc: "Qualified leads sync to CRM, track ROI and attribution",
              },
            ].map((item) => (
              <Card
                key={item.step}
                className="p-6 bg-card border-border relative overflow-hidden group"
              >
                <div className="text-6xl font-bold text-primary/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Lead Generation?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join enterprise brands already using Leadequator to turn social
            conversations into measurable pipeline.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30"
          >
            Request Pilot Program
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
