
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import { Link } from 'react-router-dom';
import { Leaf, BarChart3, ListTodo, Search } from 'lucide-react';

const features = [
  {
    title: 'Log Activities',
    description: 'Record your daily eco-friendly actions',
    icon: Leaf,
    color: 'bg-eco-forest text-white',
    link: '/log'
  },
  {
    title: 'View History',
    description: 'See all your logged green activities',
    icon: ListTodo,
    color: 'bg-eco-leaf text-eco-charcoal',
    link: '/view'
  },
  {
    title: 'Search Logs',
    description: 'Find specific eco actions you\'ve taken',
    icon: Search,
    color: 'bg-eco-sky text-eco-charcoal',
    link: '/search'
  },
  {
    title: 'Track Progress',
    description: 'Visualize your environmental impact',
    icon: BarChart3,
    color: 'bg-eco-earth text-white',
    link: '/stats'
  }
];

const Index = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-eco-cream to-green-50 p-8 mb-12 shadow-md border border-eco-forest/10 leaf-pattern">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4">
            <Leaf className="h-16 w-16 text-eco-forest animate-leaf-fall" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-eco-forest">
            GreenGoals
          </h1>
          <p className="text-xl mb-6 text-eco-charcoal/80">
            Track your sustainable lifestyle and make a positive impact on our planet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-eco-forest hover:bg-eco-moss">
              <Link to="/log">Start Tracking</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/stats">View Your Impact</Link>
            </Button>
          </div>
        </div>
      </div>

      <PageHeader 
        title="Build Sustainable Habits" 
        description="GreenGoals helps you track eco-friendly activities, visualize your progress, and develop lasting green habits."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="eco-card border-none overflow-hidden">
            <CardContent className="p-0">
              <Link to={feature.link} className="block group">
                <div className="flex flex-col h-full">
                  <div className={`${feature.color} p-6`}>
                    <feature.icon className="h-10 w-10" />
                  </div>
                  <div className="p-6 flex-grow bg-card">
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                  <div className="p-4 bg-muted/30 border-t border-border text-right">
                    <span className="text-sm font-medium text-primary inline-flex items-center group-hover:underline">
                      Get Started
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-eco-forest/5 rounded-lg border border-eco-forest/10 text-center">
        <h2 className="text-2xl font-bold mb-3 text-eco-forest">Ready to make a difference?</h2>
        <p className="mb-6">Start tracking your eco-friendly activities today and see the impact of your sustainable choices.</p>
        <Button asChild className="bg-eco-forest hover:bg-eco-moss">
          <Link to="/log">Log Your First Activity</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
