import { ComponentProps } from 'react';
import { cn } from '@/utils';
import CompanyData from '@/data/company.data';
import { Button } from '@/components/atoms/button';
import Link from 'next/link';
import Logo from './logo';
import { Section } from './section';
import { Separator } from '../atoms/separator';

const Footer = ({ className, ...props }: ComponentProps<'footer'>) => {
  return (
    <footer className={cn('border-t', className)} {...props}>
      <Section className="flex flex-col gap-6 py-6">
        <div className="flex w-full flex-wrap gap-12 md:gap-16 xl:gap-24">
          <div className="flex grow flex-col items-start">
            <Logo className="mb-3" />
            <p className="typo-body text-muted-foreground mb-3 max-w-md">
              {CompanyData.description}
            </p>
          </div>

          {Object.entries(CompanyData.menu).map(([key, menu]) => (
            <div key={key} className="flex flex-col items-start">
              <p className="typo-heading-xs mb-3">{menu.title}</p>
              {menu.links.map((item, i) => (
                <Button
                  key={i}
                  variant={'link'}
                  className="text-muted-foreground"
                  asChild
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <p className="typo-body text-muted-foreground whitespace-nowrap">
            {CompanyData.copyright}
          </p>
        </div>
      </Section>
    </footer>
  );
};

export { Footer };
