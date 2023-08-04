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
    " text-bold rounded-md bg-black/80 px-2 py-0.5 text-maize dark:bg-white/70 dark:text-mblue";
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
    <header className="bg-maize px-8 pt-8 dark:bg-mblue md:px-14">
      <div className="mx-auto max-w-[1000px] md:w-5/6 xl:w-4/6 2xl:w-3/6">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div>
            <span className="ml-0.5 flex items-center font-extralight">
              EECS 281{" "}
              <svg
                viewBox="0 0 22 22"
                aria-hidden
                role="img"
                className="-mt-0.5 ml-0.5 inline h-5 w-5 fill-mblue dark:fill-maize"
              >
                <g>
                  <path d="M20.396 11a3.487 3.487 0 0 0-2.008-3.062 3.474 3.474 0 0 0-.742-3.584 3.474 3.474 0 0 0-3.584-.742A3.468 3.468 0 0 0 11 1.604a3.463 3.463 0 0 0-3.053 2.008 3.472 3.472 0 0 0-1.902-.14c-.635.13-1.22.436-1.69.882a3.461 3.461 0 0 0-.734 3.584A3.49 3.49 0 0 0 1.604 11a3.496 3.496 0 0 0 2.017 3.062 3.471 3.471 0 0 0 .733 3.584 3.49 3.49 0 0 0 3.584.742A3.487 3.487 0 0 0 11 20.396a3.476 3.476 0 0 0 3.062-2.007 3.335 3.335 0 0 0 4.326-4.327A3.487 3.487 0 0 0 20.396 11zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                </g>
              </svg>
            </span>
            <h1 className="align-middle text-3xl font-extrabold md:text-4xl">
              Autograder{" "}
              <span className="text-black/60 dark:text-white/80">Status</span>
            </h1>
          </div>
          <nav>
            <ul className="flex items-center gap-3 whitespace-nowrap">
              <NavItem link="#" active>
                Current Status
              </NavItem>
              <NavItem link="https://piazza.com/">Piazza</NavItem>
              <NavItem link="https://www.gradescope.com/">Gradescope</NavItem>
            </ul>
          </nav>
        </div>
        <section className="relative top-6 flex flex-row items-center gap-4 rounded-md bg-white p-4 shadow dark:bg-pumablack dark:ring-2 dark:ring-green-800">
          <span
            role="img"
            aria-hidden
            className="inline-block h-8 w-8 rounded-full border-2 border-green-500 text-center text-xl text-green-500"
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
