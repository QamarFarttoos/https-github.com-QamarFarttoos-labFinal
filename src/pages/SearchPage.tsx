
import React, { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import HabitList from '@/components/HabitList';
import PageHeader from '@/components/PageHeader';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type HabitActivity = {
  id: string;
  activity: string;
  date: Date;
  notes: string;
};

const SearchPage = () => {
  const [allHabits, setAllHabits] = useState<HabitActivity[]>([]);
  const [filteredHabits, setFilteredHabits] = useState<HabitActivity[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  // Load all habits on component mount
  useEffect(() => {
    try {
      const storedHabits = localStorage.getItem('greenHabits');
      if (storedHabits) {
        setAllHabits(JSON.parse(storedHabits));
      }
    } catch (error) {
      console.error('Error loading habits:', error);
      toast({
        title: "Error",
        description: "There was a problem loading your activities.",
        variant: "destructive"
      });
    }
  }, []);

  const handleSearch = (searchTerm: string) => {
    setHasSearched(true);
    
    if (!searchTerm) {
      setFilteredHabits([]);
      return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const results = allHabits.filter(habit => 
      habit.activity.toLowerCase().includes(searchLower) || 
      (habit.notes && habit.notes.toLowerCase().includes(searchLower))
    );
    
    setFilteredHabits(results);
    
    if (results.length === 0) {
      toast({
        title: "No results found",
        description: `No activities matching "${searchTerm}" were found.`,
        variant: "default"
      });
    } else {
      toast({
        title: "Search complete",
        description: `Found ${results.length} matching activities.`,
        variant: "default"
      });
    }
  };

  // Handle habit deletion
  const handleDelete = (id: string) => {
    try {
      // Update both states
      const updatedAllHabits = allHabits.filter(habit => habit.id !== id);
      const updatedFilteredHabits = filteredHabits.filter(habit => habit.id !== id);
      
      setAllHabits(updatedAllHabits);
      setFilteredHabits(updatedFilteredHabits);
      
      // Update localStorage
      localStorage.setItem('greenHabits', JSON.stringify(updatedAllHabits));
      
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
        title="Search Activities" 
        description="Find specific eco-friendly activities in your logs"
        icon={<Search className="h-6 w-6 text-primary" />}
      />
      
      <div className="mb-8">
        <SearchForm onSearch={handleSearch} />
      </div>
      
      {hasSearched && (
        <div className="max-w-2xl mx-auto">
          <HabitList 
            habits={filteredHabits} 
            onDelete={handleDelete}
            title="Search Results" 
            emptyMessage={
              filteredHabits.length === 0 
                ? "No matching activities found. Try a different search term." 
                : "No activities logged yet."
            }
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
