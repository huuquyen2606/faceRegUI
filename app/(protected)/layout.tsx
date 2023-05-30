import { NavigationBar } from "@/components/navigation-bar/navigation-bar";
import { CheckUser } from "./check-user";

export default function ProtectedLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div>
      <CheckUser>
        <NavigationBar />
        {children}
      </CheckUser>
    </div>
  );
}
