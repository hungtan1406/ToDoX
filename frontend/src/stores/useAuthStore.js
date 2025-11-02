import { create } from 'zustand';
import { toast } from 'sonner';
import { authService } from '@/services/authService';

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  loading: false,
  tasks: [],

  clearState: () => {
    set({ accessToken: null, tasks: [], loading: false });
  },

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  signUp: async (username, password, email) => {
    try {
      set({ loading: true });
      await authService.signUp(username, password, email);
      toast.success('Đăng ký thành công! Hãy đăng nhập để tiếp tục.');
    } catch (error) {
      console.error(error);
      toast.error('Đăng ký không thành công');
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });
      const { accessToken } = await authService.signIn(username, password);
      get().setAccessToken(accessToken);
      await get().fetchTask();
      toast.success('Đăng nhập thành công!');
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Sai username hoặc password. Hãy nhập lại!');
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
      toast.success('Đăng xuất thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Lỗi đăng xuất. Hãy thử lại!');
    }
  },

  fetchTask: async () => {
    try {
      set({ loading: true });
      const { tasks, activeCount, completedCount } =
        await authService.fetchTask();
      set({ tasks, activeCount, completedCount });
    } catch (error) {
      console.error(error);
      set({ tasks: [] });
      toast.error('Lỗi khi tải dữ liệu task.');
    } finally {
      set({ loading: false });
    }
  },

  // refresh: async () => {
  //   try {
  //     set({ loading: true });
  //     const { tasks, fetchTask, setAccessToken } = get();
  //     const accessToken = await authService.refresh();

  //     setAccessToken(accessToken);
  //     if (!tasks || tasks.length === 0) {
  //       await fetchTask();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
  //     get().clearState();
  //   } finally {
  //     set({ loading: false });
  //   }
  // },

  refresh: async () => {
    const { fetchTask, setAccessToken, clearState } = get();
    try {
      set({ loading: true });

      const res = await authService.refresh();
      const newAccessToken = res?.data?.accessToken ?? res?.accessToken ?? null;

      if (newAccessToken) {
        setAccessToken(newAccessToken);

        if (typeof fetchTask === 'function') {
          await fetchTask();
        }

        return newAccessToken;
      }

      return null;
    } catch (error) {
      const status = error?.response?.status;
      const msg = error?.response?.data?.message;

      if (status === 401 && msg === 'Token không tồn tại.') {
        return null;
      }

      console.error(error);
      toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
      clearState();
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
