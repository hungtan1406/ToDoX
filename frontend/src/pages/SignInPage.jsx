import { SigninForm } from '@/components/auth/signin-form';
const SignUpPage = () => {
  return (
    <div className='bg-muted flex flex-col items-center justify-center p-6  min-h-svh md:p-10 absolute inset-0 z-0 [background-image:radial-gradient(circle_at_30%_70%,rgba(173,216,230,0.35),transparent_60%),radial-gradient(circle_at_70%_30%,rgba(255,182,193,0.4),transparent_60%)]'>
      <div className='w-full max-w-sm md:max-w-4xl'>
        <SigninForm />
      </div>
    </div>
  );
};

export default SignUpPage;
