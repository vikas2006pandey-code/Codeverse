import AuthForm from '@/components/auth/auth-form';

export default function RegisterPage() {
  return (
    <div className="container flex items-center justify-center py-12">
      <AuthForm mode="register" />
    </div>
  );
}
