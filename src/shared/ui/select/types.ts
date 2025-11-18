export interface ISelectOption {
  value: string | number;
  label: string;
}

export interface ISelectProps {
  options: ISelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
}

