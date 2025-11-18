export interface IButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'cancel';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface IButtonEmits {
  click: [event: MouseEvent];
}

