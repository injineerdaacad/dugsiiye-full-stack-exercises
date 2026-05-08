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
} from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, UserRound, WalletCards } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader({ user, uploadMutation, onDashboardClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isProfileOpen) return;

    function handlePointerDown(event) {
      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileOpen]);

  function handleLogout() {
    clearAuth();
    queryClient.clear();
    navigate("/login", { replace: true });
  }

  function handleUpload(event) {
    const file = event.target.files?.[0];

    if (file) {
      uploadMutation.mutate(file);
    }
  }

  const avatar = user?.profilePicture ? (
    <img src={user.profilePicture} alt={user.name || "User"} className="h-full w-full object-cover" />
  ) : (
    <UserRound className="h-5 w-5 text-muted-foreground" />
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="flex h-[72px] w-full items-center justify-between px-5">
        <button
          type="button"
          onClick={onDashboardClick}
          className="group flex cursor-pointer items-center gap-3 rounded-md text-left outline-none transition hover:text-sky-700 focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label="Go to dashboard overview"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary shadow-sm shadow-sky-500/30 transition group-hover:-translate-y-0.5 group-hover:bg-sky-600">
            <WalletCards className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight text-slate-900 transition group-hover:text-sky-700">Finance Dashboard</h1>
            <p className="text-xs text-slate-500">Personal Finance ERP</p>
          </div>
        </button>

        <div className="flex items-center gap-4">
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((value) => !value)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-secondary transition hover:-translate-y-0.5 hover:ring-2 hover:ring-ring/40 active:translate-y-0"
              aria-label="Open profile"
            >
              {avatar}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border bg-secondary">
                    {avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{user?.name || "User"}</p>
                    <p className="truncate text-sm text-muted-foreground">{user?.email || "No email loaded"}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{user?.role || "user"}</p>
                  </div>
                </div>

                <Button asChild variant="outline" className="mt-4 w-full">
                  <Label className="cursor-pointer justify-center">
                    <Upload className="size-4" />
                    {uploadMutation.isPending ? "Uploading..." : "Upload Profile Image"}
                    <Input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </Label>
                </Button>
              </div>
            )}
          </div>
          <AlertDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Logout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              onOverlayClick={() => setIsLogoutOpen(false)}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>Logout from your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to sign in again before viewing your finance dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
}
