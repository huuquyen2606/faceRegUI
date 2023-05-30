import { UserItems } from "./user-items";

export default function Home(): JSX.Element {
  return (
    <>
      <div className="w-full px-16">
        <UserItems />
      </div>
      <div className="border-t w-full px-16 border-dashed border-gray-300">
        <div className="h-32 border-l border-r border-dashed border-gray-300" />
      </div>
    </>
  );
}
