import { withRouter } from 'storybook-addon-react-router-v6';
import { Meta, StoryObj } from "@storybook/react";
import { CardNavigation, CardNavigationProps } from "./CardNavigation";
import {FiSettings} from 'react-icons/fi';
import { Fragment } from 'react';

export default {
  title: "Components/CardNavigation",
  component: CardNavigation,

  args: {
    route: '/',
    children: (
      <span className='name-card-navigation'>Navegar</span>
    )
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    },
  },
  decorators : [withRouter],
} as Meta<CardNavigationProps>

export const Default: StoryObj<CardNavigationProps> = {}

export const CardWithIconLeft: StoryObj<CardNavigationProps> = {
  args: {
    route: '/dashboard',
    children: (
      <Fragment>
        <FiSettings />
        <span className='name-card-navigation'>Dashboard</span>
      </Fragment>
    )
  }
}

export const CardWithIconRight: StoryObj<CardNavigationProps> = {
  args: {
    route: '/dashboard',
    children: (
      <Fragment>
         <span className='name-card-navigation'>Dashboard</span>
        <FiSettings />
      </Fragment>
    )
  }
}
