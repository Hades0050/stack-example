export interface IInputProps {
  type?: 'text' | 'email' | 'password' | 'date' | 'number';
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
}

export interface IInputEmits {
  blur: [event: FocusEvent];
}

