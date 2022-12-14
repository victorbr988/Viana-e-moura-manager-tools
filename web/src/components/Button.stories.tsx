import { Meta, StoryObj } from '@storybook/react';
import { ButtonAdd, ButtonRootProps } from './Button';
import { FiPlus } from 'react-icons/fi'
import reactImage from '../assets/react.svg'
import { Fragment } from 'react';

export default {
  title: "Components/button",
  component: ButtonAdd,
  args: {
    children: (
      <h2 className='text-sm text-white font-sans'>Novo</h2>
    ),
  },
  argTypes: {
    children:{
      table: {
        disable: true,
      },
    },
  },
} as Meta<ButtonRootProps>

export const Default: StoryObj<ButtonRootProps> = {}

export const ButtonWithImage: StoryObj<ButtonRootProps> = {
  args: {
    children: (
      <Fragment>
        <img className='w-6 h-6' src={reactImage} alt="react-image" />
        <h2 className='text-sm text-white font-sans'>Novo</h2>
      </Fragment>
    )
  }
}

export const ButtonWithIcon: StoryObj<ButtonRootProps> = {
  args: {
    children: (
      <Fragment>
        <FiPlus />
        <h2 className='text-sm text-white font-sans'>Novo</h2>
      </Fragment>
    )
  }
}
