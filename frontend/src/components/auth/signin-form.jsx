import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router';

const signInSchema = z.object({
  username: z.string().min(3, 'Tên người dùng ít nhất 3 ký tự'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

export function SigninForm({ className, ...props }) {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    const { username, password } = data;
    const success = await signIn(username, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='p-0 overflow-hidden border-border'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center gap-2 text-center'>
                <a href='/' className='block mx-auto text-center w-fit'>
                  <img src='/logo.svg' alt='logo' className='size-10' />
                </a>
                <h1 className='text-2xl font-bold'>ToDoList xin chào!</h1>
                <p className='text-muted-foreground text-balance'>
                  Hãy đăng nhập vào tài khoản ToDoList để bắt đầu!
                </p>
              </div>
              {/* username */}
              <div className='flex flex-col gap-3'>
                <Label htmlFor='username' className='block text-sm'>
                  Tên đăng nhập
                </Label>
                <Input type='text' id='username' {...register('username')} />
                {errors.username && (
                  <p className='text-sm text-destructive'>
                    {errors.username.message}
                  </p>
                )}
              </div>
              {/* password */}
              <div className='flex flex-col gap-3'>
                <Label htmlFor='password' className='block text-sm'>
                  Mật khẩu
                </Label>
                <Input
                  type='password'
                  id='password'
                  {...register('password')}
                />
                {errors.password && (
                  <p className='text-sm text-destructive'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* button */}
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                Đăng nhập
              </Button>

              <div className='text-sm text-center'>
                Bạn chưa có tài khoản?{' '}
                <a href='/signup' className='underline underline-offset-4'>
                  Đăng ký ngay!
                </a>
              </div>
            </div>
          </form>
          <div className='relative hidden bg-muted md:block'>
            <img
              src='/placeholder.png'
              alt='Image'
              className='absolute object-cover -translate-y-1/2 top-1/2 '
            />
          </div>
        </CardContent>
      </Card>
      <div className='text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offetset-4'>
        Bằng cách tiếp tục, bạn đồng ý với <a href='#'>Điều khoản dịch vụ</a> và{' '}
        <a href='#'>Chính sách bảo mật</a> của chúng tôi.
      </div>
    </div>
  );
}
