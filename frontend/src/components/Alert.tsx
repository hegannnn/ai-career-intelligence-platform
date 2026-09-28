interface Props {
  message: string;
  variant?: 'error' | 'info';
}

export default function Alert({ message, variant = 'error' }: Props) {
  return <div className={`alert alert-${variant}`}>{message}</div>;
}
