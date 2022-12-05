import { Meta, StoryObj } from '@storybook/react';
import { Text, TextProps } from './Text';

export default {
  title: 'Components/text',
  component: Text,
  args: {
    asChild: false,
    text: 'Small',
    size: 'sm'
  },
  argTypes: { 
    asChild: {
      table: {
        disable: true
      }
    },
    size: { 
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'] 
    }
  }
} as Meta<TextProps>

export const Default: StoryObj<TextProps> = {}