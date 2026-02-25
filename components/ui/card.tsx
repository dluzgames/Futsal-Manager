import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={twMerge(clsx('overflow-hidden rounded-lg bg-white shadow', className))}>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
