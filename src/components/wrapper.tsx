export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <div
      className={`max-w-screen-lg px-4 sm:mx-auto sm:w-5/6 xl:w-4/6 2xl:w-3/6 ${className}`}
    >
      {children}
    </div>
  );
}
