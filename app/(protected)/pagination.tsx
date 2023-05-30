"use client";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFetchUsersCount } from "@/lib/firebase/firebase-hooks";
import * as React from "react";
import { itemsPerPage } from "./user-items";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";

export function Pagination(
  props: React.PropsWithChildren<{
    currentPage: number;
    pageChanged: (page: number) => unknown;
  }>,
): JSX.Element {
  const fetchUsersCount = useFetchUsersCount();
  const [usersCount, setUsersCount] = React.useState<number>();

  React.useEffect(() => {
    // when the component mounts, we store the tasks count in the state
    fetchUsersCount().then((result) => {
      setUsersCount(result.data().count);
    });
  }, [fetchUsersCount]);

  if (usersCount === undefined) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const totalPages = Math.floor(usersCount / itemsPerPage);
  const canGoBack = props.currentPage >= 1;
  const canGoNext = props.currentPage < totalPages;

  return (
    <div className={"flex flex-row justify-end gap-4"}>
      <Button
        variant="outline"
        disabled={!canGoBack}
        className="w-28"
        onClick={() => props.pageChanged(props.currentPage - 1)}
      >
        <span className="flex items-center justify-between w-full">
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          <span>Prev</span>
        </span>
      </Button>

      <Button
        variant="outline"
        disabled={!canGoNext}
        className="w-28"
        onClick={() => props.pageChanged(props.currentPage + 1)}
      >
        <span className="flex items-center justify-between w-full">
          <span>Next</span>
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </span>
      </Button>
    </div>
  );
}
