/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/lib/firebase/types";
import { Loader2, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useLoadingCallback } from "react-loading-hook";
import { deleteUser, updateUser } from "@/lib/firebase/firebase-hooks";
import { useFirestore, useStorage } from "reactfire";
import { useForm } from "react-hook-form";
import { type AddAnUserSchema, addAnUserSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UserItemProps {
  user: User;
}

export function UserItem({ user }: UserItemProps): JSX.Element {
  const { toast } = useToast();
  const storage = useStorage();
  const store = useFirestore();
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isFormOpened, setFormOpened] = React.useState(false);

  const editForm = useForm<AddAnUserSchema>({
    resolver: zodResolver(addAnUserSchema),
    defaultValues: {
      name: user.name,
      image: {},
      note: user.note,
    },
  });

  const [handleDeleteUser, isDeleting] = useLoadingCallback(async () => {
    await deleteUser(user, store, storage);
    toast({
      title: "Success!",
      description: `User "${user.name} is deleted successfully!`,
    });
  });

  const [handleUpdateUser, isUpdatingUser] = useLoadingCallback(async (values: AddAnUserSchema) => {
    await updateUser(
      {
        user,
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
  });

  return (
    <div className="border border-dashed border-gray-300 rounded-md bg-background w-[18.5rem] flex flex-col items-center">
      <div className="flex items-center justify-between w-full px-4 py-1">
        <div className="flex flex-col h-12">
          <span className="font-semibold text-xl">{user.name}</span>
          <span className="text-sm text-gray-500">{user.note}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="icon" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Dialog open={isFormOpened} onOpenChange={setFormOpened}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add an user</DialogTitle>
                  <DialogDescription>The user will be able to unlock doors</DialogDescription>
                </DialogHeader>
                <Form {...editForm}>
                  <form
                    onSubmit={editForm.handleSubmit(handleUpdateUser)}
                    className="px-8 py-4 flex flex-col items-center w-full gap-6"
                  >
                    <FormField
                      control={editForm.control}
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
                      control={editForm.control}
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
                      control={editForm.control}
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
                    <Button type="submit" disabled={isUpdatingUser} className="w-fit ml-auto flex items-center gap-1">
                      {isUpdatingUser ? (
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
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the user and remove the data from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsDeleteOpen(false)} disabled={isDeleting}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction disabled={isDeleting} onClick={handleDeleteUser}>
                    {isDeleting ? (
                      <div className="flex items-center gap-1">
                        <span>Deleting</span>
                        <Loader2 className="animate-spin" />
                      </div>
                    ) : (
                      <span>Continue</span>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border-t border-dashed border-gray-300 rounded-md">
        <span className="w-72 h-72 relative object-contain block m-1">
          <Image src={user.image} fill alt={`${user.name}'s image`} className="rounded-md" />
        </span>
      </div>
    </div>
  );
}
