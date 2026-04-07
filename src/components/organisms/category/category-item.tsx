import { Category } from '@/types/category.type';
import { cn } from '@/utils/misc';
import { toSlug } from '@/utils/string';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

const CategoryItem = ({
  item,
  className,
  ...props
}: {
  item: Pick<Category, 'idCategory' | 'strCategoryThumb' | 'strCategory'>;
} & ComponentProps<'div'>) => {
  return (
    <div
      className={cn('group relative overflow-hidden rounded-xl', className)}
      {...props}
    >
      <Link href={`/categories/${toSlug(item.strCategory, '_')}`}>
        <Image
          src={item.strCategoryThumb}
          alt={''}
          width={500}
          height={500}
          className="h-auto w-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="dark from-background text-foreground group-hover:text-primary-foreground group-hover:from-primary pointer-events-none absolute inset-0 top-auto bottom-0 left-0 flex h-24 flex-col justify-end bg-linear-to-t p-3 transition-colors">
          <h4 className="typo-heading-sm line-clamp-2">{item.strCategory}</h4>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
