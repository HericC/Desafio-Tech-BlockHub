import { toast } from 'react-toastify';

function setErrors(element: HTMLInputElement, msg: string): void {
  element.classList.add('errors');
  toast.warning(msg);
}

function removeClassErrors(element: HTMLInputElement): void {
  element.classList.remove('errors');
}

export { setErrors, removeClassErrors };
