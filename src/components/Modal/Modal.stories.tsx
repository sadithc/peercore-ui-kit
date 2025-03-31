// Modal.stories.js
import React from 'react';
import Modal from './index';
import { fn } from '@storybook/test';
import { Meta,StoryObj } from '@storybook/react/*';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Modal',
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    isDraggable: { control: 'boolean' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onCloseFunc: fn() },
} satisfies Meta<typeof Modal>;

export default meta;

interface ModalProps {
  isDraggable?: boolean;
  outsideScroll?: boolean;
  closeButton?: boolean;
  customClass?: string;
  modalWidth?: string;
  modalHeight?: string;
  header?: boolean;
  footer?: boolean;
  onClose: () => void;
}

const Template = (args: ModalProps) => <Modal {...(args as any)} />;

export const DefaultModal = {
  render:Template,
  args:{
    isDraggable:true,
    outsideScroll:true,
    closeButton:true,
    customClass:'custom-modal',
    modalWidth:'600px',
    modalHeight:'400px',
    header:true,
    footer:true,
    onClose:() => alert('Modal Closed'),
    isOpen:true
  },
};

export const NoFooterModal = {
  render: Template,
  args: {
    isDraggable: false,
    outsideScroll: false,
    closeButton: true,
    customClass: 'no-footer-modal',
    modalWidth: '500px',
    modalHeight: '350px',
    header: true,
    footer: false,
    onClose: () => alert('Modal Closed'),
  },
};

// Type for Story
type Story = StoryObj<typeof meta>;
