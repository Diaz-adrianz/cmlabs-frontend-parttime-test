import { Category } from '@/types/category.type';
import CategoryItem from './category-item';
import { cn } from '@/utils/misc';
import { ComponentProps } from 'react';

const CategoryList = ({
  items,
  className,
  ...props
}: { items: Category[] } & ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4',
        className
      )}
      {...props}
    >
      {items?.map((item, i) => (
        <CategoryItem key={i} item={item} />
      ))}
    </div>
  );
};

export default CategoryList;
