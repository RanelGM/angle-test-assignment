type LoadErrorProps = {
  message: string,
  mod?: string
};

function LoadError({ message, mod }: LoadErrorProps) {
  return (
    <div className={`load-error ${mod ? `load-error--${mod}` : ''}`}>
      <p className="load-error__text">{message}</p>
    </div>
  );
}

export default LoadError;
