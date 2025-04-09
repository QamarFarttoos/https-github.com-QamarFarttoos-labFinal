
import React from 'react';
import HabitForm from '@/components/HabitForm';
import PageHeader from '@/components/PageHeader';
import { Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

type HabitActivity = {
  id: string;
  activity: string;
  date: Date;
  notes: string;
};

const LogPage = () => {
  const { toast } = useToast();

  const handleSubmit = (habitData: Omit<HabitActivity, 'id'>) => {
    try {
      // Get existing habits from localStorage
      const existingHabits = localStorage.getItem('greenHabits');
      const habits: HabitActivity[] = existingHabits ? JSON.parse(existingHabits) : [];
      
      // Add new habit with unique ID
      const newHabit: HabitActivity = {
        id: uuidv4(),
        ...habitData
      };
      
      // Save updated habits to localStorage
      localStorage.setItem('greenHabits', JSON.stringify([newHabit, ...habits]));
      
      toast({
        title: "Activity logged!",
        description: "Your green activity has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving habit:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your activity. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader 
        title="Log Green Activity" 
        description="Record your eco-friendly actions and track your sustainability journey"
        icon={<Leaf className="h-6 w-6 text-primary" />}
      />
      
      <div className="max-w-md mx-auto">
        <HabitForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LogPage;
