
import React, { useMemo } from 'react';
import { Bar, Line, Pie } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, startOfMonth, endOfMonth, getMonth, getYear } from 'date-fns';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, LineChart, CartesianGrid } from 'recharts';

type HabitActivity = {
  id: string;
  activity: string;
  date: Date;
  notes: string;
};

type StatsDisplayProps = {
  habits: HabitActivity[];
};

const StatsDisplay: React.FC<StatsDisplayProps> = ({ habits }) => {
  // Weekly data
  const weeklyData = useMemo(() => {
    if (!habits.length) return [];
    
    const start = startOfWeek(new Date());
    const end = endOfWeek(new Date());
    const days = eachDayOfInterval({ start, end });
    
    return days.map(day => {
      const count = habits.filter(habit => 
        isSameDay(new Date(habit.date), day)
      ).length;
      
      return {
        name: format(day, 'EEE'),
        activities: count,
      };
    });
  }, [habits]);
  
  // Activity types data
  const activityTypesData = useMemo(() => {
    if (!habits.length) return [];
    
    const counts: Record<string, number> = {};
    
    habits.forEach(habit => {
      const activity = habit.activity.toLowerCase();
      counts[activity] = (counts[activity] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 activities
  }, [habits]);
  
  // Monthly trend data
  const monthlyTrendData = useMemo(() => {
    if (!habits.length) return [];
    
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    const days = eachDayOfInterval({ start, end });
    
    // Create a cumulative count
    let cumulativeCount = 0;
    
    return days.map(day => {
      const dayActivities = habits.filter(habit => 
        isSameDay(new Date(habit.date), day)
      ).length;
      
      cumulativeCount += dayActivities;
      
      return {
        name: format(day, 'd'),
        total: cumulativeCount,
        daily: dayActivities
      };
    });
  }, [habits]);
  
  // If no data, show placeholder
  if (!habits.length) {
    return (
      <Card className="eco-card w-full animate-fade-in">
        <CardHeader>
          <CardTitle className="text-center text-primary">Your Eco Impact</CardTitle>
          <CardDescription className="text-center">Track your progress over time</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[300px]">
          <p className="text-muted-foreground">Log some green activities to see your stats!</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="eco-card w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center text-primary">Your Eco Impact</CardTitle>
        <CardDescription className="text-center">Track your progress over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="activities">Activity Types</TabsTrigger>
            <TabsTrigger value="trend">Monthly Trend</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value) => [Number(value), 'Activities']} />
                  <Bar dataKey="activities" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="activities" className="mt-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityTypesData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#81C784"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  />
                  <Tooltip formatter={(value) => [Number(value), 'Activities']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="trend" className="mt-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value) => [Number(value), 'Activities']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#2E7D32" 
                    name="Cumulative" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="daily" 
                    stroke="#4FC3F7" 
                    name="Daily" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StatsDisplay;
