import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to TaskForge"
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkText="Create Account"
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;