import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface TextProps {
  text?: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color: 'gray-900' | 'white';
  weigth?: 'medium' | 'semibold' | 'normal';
  asChild?: boolean;
  children?: ReactNode
}

export function Text({ children, text, size = 'sm', color = 'gray-900', weigth = 'normal', asChild }: TextProps) {
  const Comp = asChild ? Slot: 'h2'
  const content = asChild ? children : text

  return (
    <Comp 
      className={clsx(`text-${color} font-${weigth}`, {
          'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
          'text-[12px]': size === 'xs',
          'text-gray-900': color === 'gray-900',
          'text-white': color === 'white',
          'font-normal': weigth === 'normal',
          'font-medium': weigth === 'medium',
          'font-semibold': weigth === 'semibold',
        })
      }
    >
      { content }
    </Comp>
  );
};
