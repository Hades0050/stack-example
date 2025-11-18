export interface IButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface IButtonEmits {
  click: [event: MouseEvent];
}

