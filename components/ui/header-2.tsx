'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Услуги', href: '/services' },
  { label: 'Цены', href: '/#pricing' },
  { label: 'О нас', href: '/about' },
  { label: 'Блог', href: '/blog' },
];

export function ZerkLogo(props: React.ComponentProps<'a'>) {
  return (
    <Link href="/" className="flex items-center gap-1 shrink-0" {...(props as React.ComponentProps<typeof Link>)}>
      <span className="text-h5 font-bold text-white">Zerk</span>
      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1" />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto w-full transition-all duration-300 ease-out',
        scrolled && !open
          ? 'bg-bg/80 backdrop-blur-[14px] border-b border-white/5'
          : 'bg-transparent',
      )}
    >
      <nav className="container flex h-[72px] w-full items-center justify-between">
        <ZerkLogo />

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-p-02 text-text-grey hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact" className="text-p-02 text-text-grey hover:text-white transition-colors">
            Войти
          </Link>
          <Button variant="primary" href="/contact">
            Оставить заявку
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white hover:bg-white/5 transition-colors"
          aria-label="Меню"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden fixed top-[72px] left-0 right-0 bottom-0 bg-bg/95 backdrop-blur-[14px] border-t border-white/5 z-50 transition-all duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className={cn(
          'container flex h-full flex-col justify-between py-6 transition-all duration-300 ease-out',
          open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
        )}>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-p-01 text-white/80 hover:text-white py-3 border-b border-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 pb-4">
            <Link href="/contact" onClick={() => setOpen(false)} className="text-p-02 text-white/60 hover:text-white text-center py-2 transition-colors">
              Войти
            </Link>
            <Button variant="primary" href="/contact" className="w-full justify-center">
              Оставить заявку
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
