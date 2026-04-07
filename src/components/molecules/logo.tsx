import { cn } from '@/utils';
import { ChefHat } from 'lucide-react';
import React, { ComponentProps } from 'react';

const Logo = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'text-primary typo-heading-sm flex items-center gap-2',
        className
      )}
      {...props}
    >
      <ChefHat className="fill-primary text-foreground" /> Meal App
    </div>
  );
};

export default Logo;
