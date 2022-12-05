import { withRouter } from 'storybook-addon-react-router-v6';
import { Meta, StoryObj } from "@storybook/react";
import { CardNavigate, CardNavigationProps } from "./CardNavigation";
import {FiSettings} from 'react-icons/fi';
import { randonColor } from '../utils/randonColor';

export default {
  title: "Components/CardNavigation",
  component: CardNavigate.Root,

  args: {
    route: '/',
    colorBorder: randonColor(),
    children: (
      <span>Navegar</span>
    )
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    },
    colorBorder: { control: { type: 'color'} }
  },
  decorators : [withRouter],
} as Meta<CardNavigationProps>

export const Default: StoryObj<CardNavigationProps> = {}

export const CardWithIconLeft: StoryObj<CardNavigationProps> = {
  args: {
    route: '/dashboard',
    colorBorder: randonColor(),
    children: (
      <CardNavigate.WithIcon>
        <FiSettings />
        <span>Dashboard</span>
      </CardNavigate.WithIcon>
    )
  }
}

export const CardWithIconRight: StoryObj<CardNavigationProps> = {
  args: {
    route: '/dashboard',
    colorBorder: randonColor(),
    children: (
      <CardNavigate.WithIcon>
        <span>Dashboard</span>
        <FiSettings />
      </CardNavigate.WithIcon>
    )
  }
}
