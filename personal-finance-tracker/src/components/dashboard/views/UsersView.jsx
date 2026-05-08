import AdminUserManagement from "@/components/admin/AdminUserManagement";

export default function UsersView({
  currentUser,
  users,
  usersQuery,
  createUserMutation,
  updateUserMutation,
  deleteUserMutation,
}) {
  return (
    <AdminUserManagement
      currentUser={currentUser}
      users={users}
      usersQuery={usersQuery}
      createUserMutation={createUserMutation}
      updateUserMutation={updateUserMutation}
      deleteUserMutation={deleteUserMutation}
    />
  );
}
