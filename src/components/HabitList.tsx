
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

type HabitActivity = {
  id: string;
  activity: string;
  date: Date;
  notes: string;
};

type HabitListProps = {
  habits: HabitActivity[];
  onDelete: (id: string) => void;
  title?: string;
  emptyMessage?: string;
};

const HabitList: React.FC<HabitListProps> = ({ 
  habits, 
  onDelete, 
  title = "Your Green Activities", 
  emptyMessage = "No activities logged yet. Start tracking your green habits!" 
}) => {
  return (
    <Card className="eco-card w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {habits.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <ul className="space-y-4">
            {habits.map((habit) => (
              <li key={habit.id}>
                <div className="bg-card rounded-md p-4 border border-border/50 hover:border-border transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-foreground">{habit.activity}</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(habit.date), 'PPP')}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onDelete(habit.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {habit.notes && (
                    <>
                      <Separator className="my-2" />
                      <p className="text-sm text-foreground/80 mt-1">{habit.notes}</p>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default HabitList;
