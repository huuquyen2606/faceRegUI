/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";

import { addUser, useFetchUsers } from "@/lib/firebase/firebase-hooks";
import { type DocumentSnapshot } from "firebase/firestore";
import * as React from "react";
import { Pagination } from "./pagination";
import { UserItem } from "./user-item";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { type AddAnUserSchema, addAnUserSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { useLoadingCallback } from "react-loading-hook";
import { useFirestore, useStorage } from "reactfire";
import { useToast } from "@/components/ui/use-toast";

export const itemsPerPage = 8;

export function UserItems(): JSX.Element {
  const storage = useStorage();
  const store = useFirestore();
  const { toast } = useToast();
  const [page, setPage] = React.useState(0);
  const cursors = React.useRef<Map<number, DocumentSnapshot>>(new Map());

  const [isFormOpened, setFormOpened] = React.useState(false);

  const { data, status } = useFetchUsers({
    cursor: cursors.current.get(page),
    itemsPerPage,
  });

  const users = React.useMemo(() => {
    return (
      data?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) ?? []
    );
  }, [data]);

  const addAnUserForm = useForm<AddAnUserSchema>({
    resolver: zodResolver(addAnUserSchema),
    defaultValues: {
      name: "",
      image: {},
      note: "",
    },
  });

  // callback called when changing page
  const onPageChanged = React.useCallback(
    (nextPage: number) => {
      setPage((page) => {
        // first, we save the last document as page's cursor
        cursors.current.set(page + 1, data.docs[data.docs.length - 1]);

        // then we update the state with the next page's number
        return nextPage;
      });
    },
    [data],
  );

  const [handleCreateAnUser, isCreatingUser] = useLoadingCallback(async (values: AddAnUserSchema) => {
    await addUser(
      {
        name: values.name,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        image: values.image!,
        note: values.note,
      },
      store,
      storage,
    );

    toast({
      title: "Success",
      description: `User "${values.name} is added successfully!"`,
    });

    setFormOpened(false);

    addAnUserForm.reset({
      name: "",
      image: {},
      note: "",
    });
  });

  return (
    <div
      className={cn(
        "flex flex-col border-l border-r border-dashed border-gray-300",
        status === "loading" && "items-center",
      )}
    >
      {status === "loading" ? (
        <div className="py-12">
          <Loader2 className="animate-spin w-10 h-10" />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center px-4 pt-4 py-8">
            <Dialog open={isFormOpened} onOpenChange={setFormOpened}>
              <DialogTrigger asChild>
                <Button className="w-fit ml-auto">Add an user</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add an user</DialogTitle>
                  <DialogDescription>The user will be able to unlock doors</DialogDescription>
                </DialogHeader>
                <Form {...addAnUserForm}>
                  <form
                    onSubmit={addAnUserForm.handleSubmit(handleCreateAnUser)}
                    className="px-8 py-4 flex flex-col items-center w-full gap-6"
                  >
                    <FormField
                      control={addAnUserForm.control}
                      name="name"
                      render={({ field }): JSX.Element => (
                        <FormItem className="w-full">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="User's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addAnUserForm.control}
                      name="image"
                      render={({ field: { value, onChange, ...field } }): JSX.Element => (
                        <FormItem className="w-full">
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/png, image/jpeg"
                              value={value?.filename}
                              // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                              onChange={(event) => onChange(event.target.files?.[0])}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addAnUserForm.control}
                      name="note"
                      render={({ field }): JSX.Element => (
                        <FormItem className="w-full">
                          <FormLabel>Note</FormLabel>
                          <FormControl>
                            <Input placeholder="Note" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isCreatingUser} className="w-fit ml-auto flex items-center gap-1">
                      {isCreatingUser ? (
                        <>
                          <span>Adding...</span>
                          <Loader2 className="animate-spin" />
                        </>
                      ) : (
                        <span>Add</span>
                      )}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            {users.length === 0 ? (
              <div className="px-4 py-8">
                <span className="text-xl font-semibold">{"It's very lonely here 😭."}</span>
              </div>
            ) : (
              <div className="grid grid-cols-4 grid-rows-[auto_auto] w-full px-4 py-8">
                {users.map((user) => (
                  <UserItem key={user.id} user={user} />
                ))}
              </div>
            )}
            <Pagination currentPage={page} pageChanged={onPageChanged} />
          </div>
        </>
      )}
    </div>
  );
}
