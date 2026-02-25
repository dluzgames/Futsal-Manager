import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  const variants = {
    success: 'bg-green-50 text-green-700 ring-green-600/20',
    warning: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    danger: 'bg-red-50 text-red-700 ring-red-600/10',
    neutral: 'bg-gray-50 text-gray-600 ring-gray-500/10',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
          variants[variant],
          className
        )
      )}
    >
      {children}
    </span>
  );
}
