import { Slot } from '@radix-ui/react-slot';

export interface TextProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'gray-900' | 'white';
  weigth?: 'medium' | 'semibold' | 'normal';
  asChild: boolean
}

export function Text({ text, size = 'sm', color = 'gray-900', weigth = 'normal', asChild }: TextProps) {
  const Comp = asChild ? Slot: 'h2'

  return (
    <Comp 
      className={`text-${size} text-${color} font-${weigth}`}
    >
      { text }
    </Comp>
  );
};
