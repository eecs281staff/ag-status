export default function Wrapper({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className="mx-auto max-w-[1000px] px-8 pt-8 md:w-5/6 md:px-14 xl:w-4/6 2xl:w-3/6">
      {children}
    </div>
  );
}
