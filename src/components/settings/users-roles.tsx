// src/components/settings/users-roles.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { InviteUserDialog } from "./invite-user-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";


type UserRole = 'Admin' | 'Accountant' | 'Viewer';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive' | 'Invited';
};

const initialUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@payvibe.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Jane Doe', email: 'jane.doe@payvibe.com', role: 'Accountant', status: 'Active' },
  { id: '3', name: 'John Smith', email: 'john.smith@payvibe.com', role: 'Viewer', status: 'Invited' },
  { id: '4', name: 'Sam Wilson', email: 'sam.wilson@payvibe.com', role: 'Accountant', status: 'Active' },
  { id: '5', name: 'Alice Johnson', email: 'alice.j@payvibe.com', role: 'Admin', status: 'Inactive' },
];

const PAGE_SIZE = 3;

export function UsersAndRolesSettings() {
  const [users, setUsers] = useLocalStorage<User[]>("users", initialUsers);
  const [currentPlan] = useLocalStorage('currentPlan', 'Free');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  
  const handleAddUser = (newUser: Omit<User, 'id' | 'status'>) => {
    const user: User = {
      ...newUser,
      id: crypto.randomUUID(),
      status: 'Invited'
    };
    setUsers([...users, user]);
  }

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Removed",
      description: "The user has been successfully removed from the account.",
    });
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
     toast({
      title: "Role Updated",
      description: "The user's role has been successfully updated.",
    });
  };

  const handleResendInvitation = (email: string) => {
    toast({
      title: "Invitation Sent",
      description: `An invitation has been resent to ${email}.`,
    });
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "all" || user.role === roleFilter)
    );
  }, [users, searchTerm, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Manage who has access to your PayVibe account.</p>
        <div className="flex items-center gap-2">
            {currentPlan === 'Free' && (
                <Button variant="outline" asChild>
                    <Link href="/settings?tab=plans">Add Accounting Firm</Link>
                </Button>
            )}
            <Button onClick={() => setIsInviteDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Invite User
            </Button>
        </div>
      </div>

       <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Select value={roleFilter} onValueChange={(value) => {
            setRoleFilter(value);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Accountant">Accountant</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

      <Table>
        <TableCaption>A list of users with access to this account.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                   <Avatar className="h-8 w-8">
                     <AvatarImage data-ai-hint="person avatar" src={`https://i.pravatar.cc/40?u=${user.id}`} alt={user.name} />
                     <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                   </Avatar>
                   <div>
                     <p className="font-semibold">{user.name}</p>
                     <p className="text-sm text-muted-foreground">{user.email}</p>
                   </div>
                </div>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={
                  user.status === 'Active' ? 'secondary' 
                  : user.status === 'Invited' ? 'outline'
                  : 'destructive'
                }>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Edit Role</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'Admin')}>Admin</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'Accountant')}>Accountant</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'Viewer')}>Viewer</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {user.status === 'Invited' && <DropdownMenuItem onClick={() => handleResendInvitation(user.email)}>Resend Invitation</DropdownMenuItem>}
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">Remove User</DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove {user.name} from the account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemoveUser(user.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      <InviteUserDialog
        isOpen={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onAddUser={handleAddUser}
      />
    </div>
  );
}
