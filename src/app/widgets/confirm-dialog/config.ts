export interface ConfirmDialogConfig {
  messages: {
    title: string;
    content: string;
    confirm: string;
    dismiss: string;
  };
  colors: {
    confirmButton: 'default' | 'warn' | 'accent' | 'primary';
  }
}
