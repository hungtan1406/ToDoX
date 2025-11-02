// src/components/Header.jsx
import { Button } from './ui/button';
import { useAuthStore } from '@/stores/useAuthStore';

const Header = () => {
  const { signOut } = useAuthStore();

  return (
    <header className='flex items-center justify-between mb-6'>
      <h1 className='text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-400'>
        ToDoX
      </h1>
      <Button
        variant='outline'
        className='text-sm font-medium hover:bg-indigo-50'
        onClick={signOut}
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;
