import Wrapper from "@/components/wrapper";
import ThemeSwitch from "@/components/theme-switch";

export default function Footer() {
  return (
    <footer className="mt-auto border-t p-4 text-sm text-zinc-500 dark:border-slate-600/60 md:p-6 md:text-base">
      <Wrapper>
        <div className="flex w-full flex-row items-center justify-between">
          <p>
            &copy;{" "}
            <a
              href="https://cse.engin.umich.edu/"
              className="transition hover:text-maize dark:hover:text-maize/80"
            >
              University of Michigan
            </a>
          </p>
          <ThemeSwitch />
        </div>
      </Wrapper>
    </footer>
  );
}
