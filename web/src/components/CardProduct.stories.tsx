import {Meta, StoryObj} from '@storybook/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { randonColor } from '../utils/randonColor';
import { CardProduct, CardProductProps } from './CardProduct';

const mockData = {
  id: 2,
  name: 'Broca'
}

export default {
  title: 'Components/CardProduct',
  component: CardProduct,
  args: {
    children:(
      <>
        <FiEdit 
          className='text-green-900'
        />
        <FiTrash2 
          className='text-red-900' 
        />
      </>
    ),
    data: mockData,
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    },
    data: {
      table: {
        disable: true
      }
    },
  }
} as Meta<CardProductProps>

export const Default: StoryObj<CardProductProps> = {}