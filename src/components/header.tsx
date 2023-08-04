function NavItem({
  children,
  link,
  active,
}: {
  children: React.ReactNode;
  link: string;
  active?: boolean;
}) {
  const activeItemClass =
    " bg-black/80 dark:bg-white/70 dark:text-mblue py-0.5 px-2 rounded-md text-maize text-bold";
  return (
    <li className={"inline-block" + (active ? activeItemClass : "")}>
      <a href={link} rel="noopener" target="_blank">
        {children}
      </a>
    </li>
  );
}

export default function Header() {
  return (
    <header className="bg-maize dark:bg-mblue pt-10 px-8 md:px-14">
      <div className="mx-auto md:w-5/6 xl:w-4/6 2xl:w-3/6 max-w-[1000px]">
        <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
          <div>
            <span className="flex items-center -mt-2 ml-0.5 font-extralight">
              EECS 281{" "}
              <svg
                viewBox="0 0 22 22"
                aria-hidden
                role="img"
                className="w-5 h-5 inline ml-0.5 -mt-0.5 fill-mblue dark:fill-maize"
              >
                <g>
                  <path d="M20.396 11a3.487 3.487 0 0 0-2.008-3.062 3.474 3.474 0 0 0-.742-3.584 3.474 3.474 0 0 0-3.584-.742A3.468 3.468 0 0 0 11 1.604a3.463 3.463 0 0 0-3.053 2.008 3.472 3.472 0 0 0-1.902-.14c-.635.13-1.22.436-1.69.882a3.461 3.461 0 0 0-.734 3.584A3.49 3.49 0 0 0 1.604 11a3.496 3.496 0 0 0 2.017 3.062 3.471 3.471 0 0 0 .733 3.584 3.49 3.49 0 0 0 3.584.742A3.487 3.487 0 0 0 11 20.396a3.476 3.476 0 0 0 3.062-2.007 3.335 3.335 0 0 0 4.326-4.327A3.487 3.487 0 0 0 20.396 11zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                </g>
              </svg>
            </span>
            <h1 className="text-3xl md:text-4xl align-middle font-extrabold">
              Autograder{" "}
              <span className="text-black/60 dark:text-white/80">Status</span>
            </h1>
          </div>
          <nav>
            <ul className="flex gap-3 items-center whitespace-nowrap">
              <NavItem link="#" active>
                Current Status
              </NavItem>
              <NavItem link="https://piazza.com/">Piazza</NavItem>
              <NavItem link="https://www.gradescope.com/">Gradescope</NavItem>
            </ul>
          </nav>
        </div>
        <section className="relative top-6 bg-white shadow dark:bg-pumablack dark:ring-2 dark:ring-green-800 rounded-md p-4 flex flex-row items-center gap-4">
          <span
            role="img"
            aria-hidden
            className="w-8 h-8 border-2 border-green-500 rounded-full inline-block text-xl text-green-500 text-center"
          >
            ➔
          </span>
          <div>
            <h2 className="text-lg font-bold">Recommend using: Node A</h2>
            <p className="text-sm text-green-500">All systems operational</p>
          </div>
        </section>
      </div>
    </header>
  );
}
