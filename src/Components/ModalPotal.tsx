import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPotal({ children }: Props) {
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.getElementById('modal-root') as Element;
  return ReactDOM.createPortal(children, node);
}
