import { cn } from './utils';

export function generateItemClasses(
  isActive: boolean,
  isHovered: boolean,
  isSelected: boolean,
  isLastSelected: boolean,
): string {
  return cn(
    'rounded cursor-grab transition-colors duration-100 ease-in-out relative overflow-hidden',
    isActive && 'bg-emerald-600 dark:bg-emerald-800',
    isHovered && 'bg-orange-500 dark:bg-orange-700',
    isSelected
      ? 'bg-background rounded text-center pt-4 cursor-default absolute inset-0 h-full h-fit w-full md:w-[40%] m-auto z-50 flex flex-wrap flex-col'
      : 'rounded h-full w-full',
    isLastSelected && 'z-40',
  );
}
