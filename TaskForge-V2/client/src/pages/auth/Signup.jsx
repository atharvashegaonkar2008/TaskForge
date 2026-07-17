import AuthLayout from "../../components/auth/AuthLayout";
import SignupForm from "../../components/auth/SignupForm";

function Signup() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join TaskForge to manage your projects"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
    >
      <SignupForm />
    </AuthLayout>
  );
}

export default Signup;