export default function Wrapper({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className="mx-auto max-w-[1000px] px-4 pt-8 md:w-5/6 xl:w-4/6 2xl:w-3/6">
      {children}
    </div>
  );
}
