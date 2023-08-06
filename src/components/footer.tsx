import Wrapper from "@/utils/wrapper";

export default function Footer() {
  return (
    <Wrapper className="mt-auto">
      <footer className="p-8 text-center text-sm md:text-base">
        &copy; University of Michigan, {new Date().getFullYear()}
      </footer>
    </Wrapper>
  );
}
