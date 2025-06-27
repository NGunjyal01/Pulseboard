
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, Zap, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const features = [
    {
        icon: BarChart3,
        title: "Real-time Analytics",
        description: "Visualize your data with beautiful, interactive charts that update in real-time."
    },
    {
        icon: Users,
        title: "Team Collaboration", 
        description: "Work together seamlessly with live cursors, comments, and annotations."
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Built for performance with instant updates and smooth interactions."
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Role-based access control and enterprise-grade security features."
    }
];

const Homepage = () => {
    return (
    <div className="min-h-screen bg-background">
        <div className="absolute right-[10%] top-5">
            <ThemeToggle/>
        </div>
        {/* Hero Section */}
        <section className="gradient-bg py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/40 to-primary rounded-3xl flex items-center justify-center shadow-2xl">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary/10 to-primary bg-clip-text text-transparent">
              Pulseboard
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The most beautiful way to visualize and collaborate on data dashboards. 
              Real-time updates, seamless collaboration, and powerful analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-4 h-auto">
                <Link to="/dashboards">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-primary text-lg px-8 py-4 h-auto border-2 hover:bg-primary/5">
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className=" py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built for Modern Teams
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, share, and collaborate on beautiful data dashboards.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-8 card-hover">
                  <div className="flex items-start gap-6 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/40 to-primary rounded-xl flex items-center justify-center">
                      <feature.icon className="w-12 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        

        {/* CTA Section */}
        <section className="gradient-bg py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Data?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams already using Pulseboard to make data-driven decisions.
            </p>
            <Button asChild size="lg" className="btn-primary text-lg px-8 py-4 h-auto">
              <Link to="/dashboards">
                Start Building Dashboards
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    )
}

export default Homepage
