import { DialogContainer } from './dialog.container';

export interface DialogAction {
  value: any;
  text: string;
  color?: string;
}

export interface DialogSettings {
  container: DialogContainer;
  title: string;
  body: string;
  actions?: DialogAction[];
}

export const DIALOG_SETTINGS_DEFAULTS: { actions: DialogAction[] } = {
  actions: [
    {
      value: true,
      text: 'Yes',
    },
    {
      value: false,
      text: 'No',
    },
  ],
};
