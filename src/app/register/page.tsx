import AuthForm from '@/components/auth/auth-form';

export default function RegisterPage() {
    return (
    <div className="relative min-h-[calc(100vh-3.5rem)] w-full overflow-hidden flex items-center justify-center py-12">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 bg-background">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)_/_0.2),rgba(255,255,255,0))]"></div>
        </div>
        
        <AuthForm mode="register" />
    </div>
  );
}
