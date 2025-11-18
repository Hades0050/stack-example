import { ref, h, render, type Ref } from 'vue';
import Modal from '@shared/ui/modal/Modal.vue';
import type {
  ModalProps,
  ModalResolve,
  ModalOptions,
  ModalState,
} from '@shared/ui/modal/types';

export type {
  ModalProps,
  ModalResolve,
  ModalOptions,
  ModalState,
};

const createModalState = <T = any>(): ModalState<T> => ({
  isOpen: false,
  options: null,
  resolve: null,
});

const handleModalClose = <T = any>(
  state: ModalState<T>,
  result: T | null = null
): void => {
  const { isOpen, resolve, options } = state;
  if (!isOpen) return;

  state.isOpen = false;

  if (resolve) {
    resolve(result);
    result !== null ? options?.onConfirm?.(result) : options?.onCancel?.();
  }

  state.resolve = null;
  state.options = null;
};

export const useModal = <T = any>() => {
  const state = ref(createModalState<T>()) as Ref<ModalState<T>>;
  const componentProps = ref<ModalProps>({});

  const openModal = (options: ModalOptions<T>): Promise<T | null> => {
    const { props = {} } = options;
    return new Promise((resolve) => {
      state.value = { options, isOpen: true, resolve };
      componentProps.value = props;
    });
  };

  const closeModal = (result: T | null = null): void => {
    handleModalClose(state.value, result);
  };

  return {
    modalInstance: state,
    currentOptions: state,
    componentProps,
    openModal,
    closeModal,
  };
};

class GlobalModalService {
  private state = createModalState();
  private container: HTMLElement | null = null;

  open<T = any>(options: ModalOptions<T>): Promise<T | null> {
    return new Promise((resolve) => {
      this.state = { options, isOpen: true, resolve: resolve as any };
      this.render();
    });
  }

  close(result: any = null): void {
    handleModalClose(this.state, result);
    this.destroy();
  }

  private render(): void {
    const { options, isOpen } = this.state;
    if (!options) return;

    if (!this.container) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }

    const { title = '', component, props = {}, large = false, closable = true, closeOnOverlay = true } = options;

    const vnode = h(
      Modal,
      {
        modelValue: isOpen,
        'onUpdate:modelValue': (value: boolean) => !value && this.close(),
        title,
        large,
        closable,
        closeOnOverlay,
        onClose: () => this.close(),
      },
      {
        default: () => h(component, props),
      }
    );

    render(vnode, this.container);
  }

  private destroy(): void {
    if (this.container) {
      render(null, this.container);
      document.body.removeChild(this.container);
      this.container = null;
    }
  }
}

export const globalModal = new GlobalModalService();


