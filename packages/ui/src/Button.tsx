import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
};

const variants = {
  primary: 'bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-500',
  secondary: 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 focus-visible:ring-violet-500',
  ghost: 'text-slate-700 hover:bg-slate-100 focus-visible:ring-violet-500',
};

export function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  return <button className={`inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`} {...props}>{children}</button>;
}
