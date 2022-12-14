import { withRouter } from 'storybook-addon-react-router-v6';
import { Meta, StoryObj } from "@storybook/react";
import { CardMovimentation, CardMovimentationProps } from './CardMovimentation';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Fragment } from 'react';

const mockDataEntrance = {
  "toolName": "Disco diamantado",
	"addedAt": "06/10/2022",
	"supervisorName": "Victor Gabriel",
	"quantity": 10,
	"unitPrice": 4.99
}

const mockDataExitAuthorized = {
  "status": "Autorizado",
	"requester": "Victor Gabriel",
	"toolName": "Veda Roscável",
	"requestedAt": "11/11/2021",
	"responseAt": "11/11/2021",
	"enterpriseName": "xique xique",
	"quantity": 20,
	"account": "teste",
	"subAccount": "testando"
}

const mockDataExitUnauthorized = {
  "status": "Pendente",
	"requester": "Victor Gabriel",
	"toolName": "Chave de encaixe",
	"requestedAt": "11/11/2021",
	"responseAt": "11/11/2021",
	"enterpriseName": "xique xique",
	"quantity": 20,
	"account": "teste",
	"subAccount": "testando"
}

export default {
  title: "Components/CardMovimentation",
  component: CardMovimentation,

  args: {
    route: '/entrance',
    variant: "entrance",
    data: mockDataEntrance,
    children: (
      <Fragment>
        <FiEdit className='text-green-600 cursor-pointer text-lg' />
        <FiTrash2 className='text-red-600 cursor-pointer text-lg' />
      </Fragment>
    )
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
    colorBorder: { control: { type: 'color'} },
    variant: {
      table: {
        disable: true
      }
    },
  },
  
  decorators : [withRouter],
} as Meta<CardMovimentationProps>

export const Default: StoryObj<CardMovimentationProps> = {}

export const CardMovimentationExitAuthorized:StoryObj<CardMovimentationProps> = {
  args: {
    variant: "exit",
    data: mockDataExitAuthorized,
    children: (
      <Fragment>
        <FiEdit className='text-green-600 cursor-pointer text-lg' />
        <FiTrash2 className='text-red-600 cursor-pointer text-lg' />
      </Fragment>
    )
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
    variant: {
      table: {
        disable: true
      }
    },
  },
}

export const CardMovimentationExitUnauthorized:StoryObj<CardMovimentationProps> = {
  args: {
    variant: "exit",
    data: mockDataExitUnauthorized,
    children: (
      <Fragment>
        <FiEdit className='text-green-600 cursor-pointer text-lg' />
        <FiTrash2 className='text-red-600 cursor-pointer text-lg' />
      </Fragment>
    )
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
    variant: {
      table: {
        disable: true
      }
    },
  },
}
