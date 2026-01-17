'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, User, Settings, Moon, Award, Trophy } from 'lucide-react';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';


const NavLinks = () => (
  <>
    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
      Home
    </Link>
    <Link href="/learning" className="text-sm font-medium transition-colors hover:text-primary">
      Missions
    </Link>
    <Link href="/challenges" className="text-sm font-medium transition-colors hover:text-primary">
      Challenges
    </Link>
    <Link href="/compete" className="text-sm font-medium transition-colors hover:text-primary">
      Compete
    </Link>
    <Link href="/games" className="text-sm font-medium transition-colors hover:text-primary">
      Games
    </Link>
    <Link href="/examination" className="text-sm font-medium transition-colors hover:text-primary">
      Examination
    </Link>
  </>
);

const MobileNavLinks = () => (
  <>
    <Link href="/" className="text-foreground transition-colors hover:text-primary">
      Home
    </Link>
    <Link href="/learning" className="text-foreground transition-colors hover:text-primary">
      Missions
    </Link>
    <Link href="/challenges" className="text-foreground transition-colors hover:text-primary">
      Challenges
    </Link>
    <Link href="/compete" className="text-foreground transition-colors hover:text-primary">
      Compete
    </Link>
    <Link href="/games" className="text-foreground transition-colors hover:text-primary">
      Games
    </Link>
    <Link href="/examination" className="text-foreground transition-colors hover:text-primary">
      Examination
    </Link>
  </>
)

export default function Header() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="font-bold font-headline">Codeverse</span>
          </Link>
          {!isUserLoading && user && (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <NavLinks />
            </nav>
          )}
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="font-bold font-headline">Codeverse</span>
              </Link>
              {!isUserLoading && user && (
                <nav className="grid gap-4 text-lg font-medium">
                  <MobileNavLinks />
                   <div className="flex flex-col gap-4 pt-4">
                      <>
                          <p className="text-sm text-muted-foreground px-2">{user.email}</p>
                          <Button variant="ghost" onClick={handleLogout} className="justify-start">
                             <LogOut className="mr-2 h-5 w-5" /> Logout
                          </Button>
                      </>
                  </div>
                </nav>
              )}
              {!isUserLoading && !user && (
                <div className="flex flex-col gap-4 pt-4">
                  <>
                      <Button asChild>
                          <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild variant="outline">
                          <Link href="/register">Register</Link>
                      </Button>
                  </>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-center md:justify-end gap-2">
           <Link href="/" className="flex items-center space-x-2 md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="font-bold font-headline">Codeverse</span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            {!isUserLoading && user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="#" alt="User avatar" />
                        <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Signed in as</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => router.push('/profile')}>
                            <User className="mr-2 h-4 w-4" />
                            <span>View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => router.push('/badges')}>
                            <Award className="mr-2 h-4 w-4" />
                            <span>Badges</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem onSelect={() => router.push('/leaderboard')}>
                            <Trophy className="mr-2 h-4 w-4" />
                            <span>Leaderboard</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => router.push('/profile/manage')}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Manage Account</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Moon className="mr-2 h-4 w-4" />
                            <span>Dark Mode</span>
                            <Switch
                                className="ml-auto"
                                checked={theme === 'dark'}
                                onCheckedChange={(checked) => {
                                    setTheme(checked ? 'dark' : 'light');
                                }}
                            />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </>
            ) : !isUserLoading ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            ) : null}
          </div>
        </div>

      </div>
    </header>
  );
}
