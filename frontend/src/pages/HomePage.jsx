import AddTask from '@/components/AddTask';
import Headers from '@/components/Header';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import StatsAndFilters from '@/components/StatsAndFilters';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/data';

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [filter, setFilter] = useState('all');
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [dateQuery, setDateQuery] = useState('today');
  const [page, setPage] = useState(1);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveCount(res.data.activeCount);
      setCompletedCount(res.data.completedCount);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || 'Không lấy được danh sách nhiệm vụ'
      );
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  const filterTask = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const totalPages = Math.ceil(filterTask.length / visibleTaskLimit) || 1;

  const visibleTasks = filterTask.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // khi đổi filter hoặc thời gian thì quay về trang 1
  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // nếu sau khi fetch mà trang hiện tại không còn task (ví dụ xoá hết ở trang cuối)
  useEffect(() => {
    if (visibleTasks.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [visibleTasks.length, page]);

  return (
    <div className='min-h-screen w-full bg-[#fefcff] relative'>
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      <div className='container relative z-10 pt-8 mx-auto'>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
          <Headers />
          <AddTask handleNewTaskAdded={handleTaskChanged} />
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeCount}
            completedTasksCount={completedCount}
          />
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />
          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={setPage}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
          <Footer
            activeTasksCount={activeCount}
            completedTasksCount={completedCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
