
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type HabitActivity = {
  id: string;
  activity: string;
  date: Date;
  notes: string;
};

type HabitFormProps = {
  onSubmit: (habitData: Omit<HabitActivity, 'id'>) => void;
};

const HabitForm: React.FC<HabitFormProps> = ({ onSubmit }) => {
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activity.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter an activity name",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit({
      activity,
      date,
      notes
    });
    
    // Reset form
    setActivity('');
    setDate(new Date());
    setNotes('');
    
    toast({
      title: "Success!",
      description: "Your green activity has been logged",
      variant: "default"
    });
  };

  return (
    <Card className="eco-card animate-fade-in w-full max-w-md mx-auto">
      <CardHeader className="bg-green-50 dark:bg-green-900/20">
        <CardTitle className="text-center text-primary">Log Your Green Activity</CardTitle>
        <CardDescription className="text-center">Record your environmental impact</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="activity">Activity</Label>
            <Input
              id="activity"
              placeholder="e.g., Biking to work, Recycling, Planting trees"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="eco-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal eco-input",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate || new Date());
                    setCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any details about your activity"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="eco-input min-h-[100px]"
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full bg-eco-forest hover:bg-eco-moss">
            Log Activity
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default HabitForm;
