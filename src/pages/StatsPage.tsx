
import React, { useState, useEffect } from 'react';
import StatsDisplay from '@/components/StatsDisplay';
import PageHeader from '@/components/PageHeader';
import { BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type HabitActivity = {
  id: string;
  activity: string;
  date: Date;
  notes: string;
};

const StatsPage = () => {
  const [habits, setHabits] = useState<HabitActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load habits from localStorage
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedHabits = localStorage.getItem('greenHabits');
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      }
    } catch (error) {
      console.error('Error loading habits:', error);
      toast({
        title: "Error",
        description: "There was a problem loading your activity data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader 
        title="Your Eco Impact" 
        description="Track your sustainable habit progress and visualize your environmental impact"
        icon={<BarChart3 className="h-6 w-6 text-primary" />}
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-muted-foreground">Loading your stats...</div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <StatsDisplay habits={habits} />
          
          <div className="mt-8 p-6 bg-eco-forest/5 rounded-lg border border-eco-forest/10">
            <h2 className="text-xl font-bold mb-3">Understanding Your Impact</h2>
            <p className="mb-4">Your sustainable activities contribute to:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-card p-4 rounded-md border border-border/50">
                <h3 className="font-medium mb-2 text-eco-forest">Reduced Carbon Footprint</h3>
                <p className="text-sm text-muted-foreground">
                  Activities like biking, using public transport, and reducing energy consumption help decrease CO2 emissions.
                </p>
              </div>
              
              <div className="bg-white dark:bg-card p-4 rounded-md border border-border/50">
                <h3 className="font-medium mb-2 text-eco-forest">Resource Conservation</h3>
                <p className="text-sm text-muted-foreground">
                  Recycling, composting, and reducing waste help conserve natural resources and reduce landfill usage.
                </p>
              </div>
              
              <div className="bg-white dark:bg-card p-4 rounded-md border border-border/50">
                <h3 className="font-medium mb-2 text-eco-forest">Healthier Environment</h3>
                <p className="text-sm text-muted-foreground">
                  Planting trees, gardening, and using eco-friendly products contribute to cleaner air, water, and soil.
                </p>
              </div>
              
              <div className="bg-white dark:bg-card p-4 rounded-md border border-border/50">
                <h3 className="font-medium mb-2 text-eco-forest">Sustainable Living</h3>
                <p className="text-sm text-muted-foreground">
                  Making eco-conscious choices daily builds habits that support a more sustainable lifestyle and future.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
