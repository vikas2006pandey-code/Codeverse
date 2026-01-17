'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Public routes that don't require authentication.
const PUBLIC_ROUTES = ['/login', '/register'];

const LoadingScreen = () => (
    <div className="container py-12">
        <div className="space-y-4 max-w-4xl mx-auto text-center">
            <Skeleton className="h-10 w-1/3 mx-auto" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
    </div>
);

/**
 * A client-side component that checks for user authentication and protects routes.
 * It ensures that only authenticated users can access protected pages.
 */
export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  // The home page is special; it has its own logic to display content
  // for both logged-in and logged-out users.
  const isHomePage = pathname === '/';

  useEffect(() => {
    // If authentication check is complete and there's no user,
    // and the current route is a protected route...
    if (!isUserLoading && !user && !isPublicRoute && !isHomePage) {
      // ...redirect them to the login page.
      router.push('/login');
    }
  }, [user, isUserLoading, router, pathname, isPublicRoute, isHomePage]);

  // Allow access to public routes and the home page without delay.
  if (isPublicRoute || isHomePage) {
    return <>{children}</>;
  }

  // While checking authentication on a protected route, show a loading screen.
  if (isUserLoading) {
    return <LoadingScreen />;
  }

  // If the user is authenticated, render the requested page.
  if (user) {
    return <>{children}</>;
  }

  // If no user is found after loading, the redirect is in progress.
  // Show a loading screen to prevent content flicker.
  return <LoadingScreen />;
}
