export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <div
      className={`max-w-[1000px] px-4 pt-8 sm:mx-auto sm:w-5/6 xl:w-4/6 2xl:w-3/6 ${className}`}
    >
      {children}
    </div>
  );
}
