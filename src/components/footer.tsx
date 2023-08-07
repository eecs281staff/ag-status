import Wrapper from "@/utils/wrapper";

export default function Footer() {
  return (
    <Wrapper className="mt-auto">
      <footer className="p-8 text-center text-sm md:text-base">
        <p>&copy; University of Michigan, {new Date().getFullYear()}</p>
        <p>Made with ❤️ by 281 staff</p>
      </footer>
    </Wrapper>
  );
}
