'use client';

import { Button } from '@/components/atoms/button';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTitle } from '@/components/atoms/sheet';
import { cn } from '@/utils/misc';
import { Section } from './section';
import CompanyData from '@/data/company.data';
import Logo from './logo';
import { usePathname } from 'next/navigation';

const Links = CompanyData.menu.main.links;

const Header = ({ className, ...props }: ComponentProps<'header'>) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={cn('bg-background shadow-lg', className)} {...props}>
      <Section className="flex flex-row items-center gap-3 py-3 md:gap-12">
        <Button
          variant={'ghost'}
          size={'icon-lg'}
          className="md:hidden"
          onClick={() => setSheetOpen((s) => !s)}
        >
          <MenuIcon />
        </Button>

        <div className="me-auto h-8">
          <Link href={'/'}>
            <Logo />
          </Link>
        </div>

        {Links.map((link, i) => (
          <Button
            key={i}
            variant={pathname == link.href ? 'default' : 'link'}
            className="not-md:hidden"
            asChild
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </Section>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="p-5" side="bottom">
          <SheetTitle visually-hidden="true"></SheetTitle>

          <div className="flex flex-col items-start gap-5">
            {Links.map((link, i) => (
              <Button
                key={i}
                variant={pathname == link.href ? 'default' : 'link'}
                className="text-foreground"
                size={'lg'}
                asChild
              >
                <Link href={link.href} onClick={() => setSheetOpen(false)}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

const HeaderStickyScroll = ({
  children,
  className,
  ...props
}: ComponentProps<'div'>) => {
  const [headerState, setHeaderState] = useState<'top' | 'up' | 'down'>('top');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setHeaderState('top');
      } else if (currentScrollY > lastScrollY.current) {
        setHeaderState('down');
      } else if (currentScrollY < lastScrollY.current) {
        setHeaderState('up');
      }

      lastScrollY.current = currentScrollY;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 *:transition-all *:duration-300',
        headerState === 'top' && '*:shadow-none',
        headerState === 'down' && '*:-translate-y-full',
        headerState === 'up' && '*:translate-y-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Header, HeaderStickyScroll };
