
import React, { useState, useEffect } from 'react';
import HabitList from '@/components/HabitList';
import PageHeader from '@/components/PageHeader';
import { ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type HabitActivity = {
  id: string;
  activity: string;
  date: Date;
  notes: string;
};

const ViewPage = () => {
  const [habits, setHabits] = useState<HabitActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load habits from localStorage
  const loadHabits = () => {
    setIsLoading(true);
    try {
      const storedHabits = localStorage.getItem('greenHabits');
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      } else {
        setHabits([]);
      }
    } catch (error) {
      console.error('Error loading habits:', error);
      toast({
        title: "Error",
        description: "There was a problem loading your activities.",
        variant: "destructive"
      });
      setHabits([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load habits on component mount
  useEffect(() => {
    loadHabits();
  }, []);

  // Handle habit deletion
  const handleDelete = (id: string) => {
    try {
      const updatedHabits = habits.filter(habit => habit.id !== id);
      setHabits(updatedHabits);
      localStorage.setItem('greenHabits', JSON.stringify(updatedHabits));
      
      toast({
        title: "Activity deleted",
        description: "The activity has been removed from your logs."
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      toast({
        title: "Error",
        description: "There was a problem deleting the activity.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader 
        title="View Your Activities" 
        description="See all your logged green activities in one place"
        icon={<ListTodo className="h-6 w-6 text-primary" />}
      />
      
      <div className="mb-6 text-center">
        <Button 
          onClick={loadHabits} 
          disabled={isLoading}
          className="bg-eco-forest hover:bg-eco-moss"
        >
          {isLoading ? "Loading..." : "Refresh Activities"}
        </Button>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <HabitList 
          habits={habits} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
};

export default ViewPage;
