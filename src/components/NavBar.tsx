
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, BarChart3, ListTodo, Home, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/log', label: 'Log Activity', icon: Leaf },
    { path: '/view', label: 'View Logs', icon: ListTodo },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/stats', label: 'Statistics', icon: BarChart3 },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Leaf className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-bold text-primary">GreenGoals</span>
          </div>
          
          <ul className="flex flex-wrap gap-1 md:gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md transition-colors text-sm",
                    location.pathname === item.path 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-muted text-foreground/80 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-1.5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
