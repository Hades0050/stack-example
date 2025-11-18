import type { Component } from 'vue';

export interface IModalProps {
  title?: string;
  large?: boolean;
  closable?: boolean;
  closeOnOverlay?: boolean;
}

export interface IModalEmits {
  close: [];
}

export type ModalProps = Record<string, any>;
export type ModalResolve<T> = (value: T | null) => void;
export type ModalCallback<T> = (result: T) => void;
export type VoidCallback = () => void;

export interface ModalOptions<T = any> {
  title?: string;
  component: Component;
  props?: ModalProps;
  large?: boolean;
  closable?: boolean;
  closeOnOverlay?: boolean;
  onConfirm?: ModalCallback<T>;
  onCancel?: VoidCallback;
}

export interface ModalState<T = any> {
  isOpen: boolean;
  options: ModalOptions<T> | null;
  resolve: ModalResolve<T> | null;
}

