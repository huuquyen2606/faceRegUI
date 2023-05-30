import { Logo } from "./logo";
import { UserMenu } from "./user-menu";

export function NavigationBar(): JSX.Element {
  return (
    <div className="sticky top-0 bg-background z-10 w-full px-16 border-b border-dashed border-gray-300">
      <div className="flex w-full justify-between px-8 py-4 border-l border-r border-dashed border-gray-300">
        <Logo />
        <UserMenu />
      </div>
    </div>
  );
}
