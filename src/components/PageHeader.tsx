
import React from 'react';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  className,
  icon
}) => {
  return (
    <div className={cn("mb-8 text-center", className)}>
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            {icon}
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
      {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
    </div>
  );
};

export default PageHeader;
