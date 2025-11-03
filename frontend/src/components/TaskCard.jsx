import React, { useState } from 'react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash } from 'lucide-react';
import { Input } from './ui/input';
import api from '@/lib/axios';
import { toast } from 'sonner';

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(task.title || '');

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('Nhiệm vụ đã xóa.');
      handleTaskChanged();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || 'Lỗi xảy ra khi xóa nhiệm vụ!'
      );
    }
  };

  const updateTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTitle,
        status: task.status,
        completedAt: task.completedAt ?? null,
      });
      toast.success('Thay đổi nhiệm vụ thành công.');
      handleTaskChanged();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || 'Lỗi xảy ra khi thay đổi nhiệm vụ!'
      );
    }
  };

  const toggleTaskCompleteButton = async () => {
    const isCompleting = task.status === 'active';
    const newStatus = isCompleting ? 'completed' : 'active';
    const newCompletedAt = isCompleting ? new Date().toISOString() : null;

    try {
      await api.put(`/tasks/${task._id}`, {
        title: task.title,
        status: newStatus,
        completedAt: newCompletedAt,
      });

      toast.success(
        isCompleting
          ? `Nhiệm vụ ${task.title} đã hoàn thành!`
          : `Nhiệm vụ ${task.title} đã chuyển về chưa hoàn thành!`
      );
      handleTaskChanged();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          'Lỗi xảy ra khi thay đổi trạng thái nhiệm vụ!'
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        'p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
        task.status === 'completed' && 'opacity-75'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          className={
            (cn('shirk-0 size-8 rounded-full transition-all duration-200'),
            task.status === 'completed'
              ? 'text-success hover:text-success/80'
              : 'text-muted-foreground hover:text-primary')
          }
          onClick={toggleTaskCompleteButton}
        >
          {task.status === 'completed' ? (
            <CheckCircle2 className='size-5' />
          ) : (
            <Circle className='size-5' />
          )}
        </Button>

        <div className='flex-1 min-w-0'>
          {isEditing ? (
            <Input
              type='text'
              placeholder='Cần phải làm gì'
              className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false);
                setUpdateTitle(task.title || '');
              }}
            />
          ) : (
            <p
              className={cn(
                'text-base transition-all duration-200',
                task.status === 'completed'
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              )}
            >
              {task.title}
            </p>
          )}
          <div className='flex items-center gap-2 mt-1'>
            <Calendar className='size-3 text-muted-foreground' />
            <span className='text-xs text-muted-foreground'>
              {new Date(task.createdAt).toLocaleString('vi-VN')}
            </span>
            {task.completedAt && (
              <>
                <span className='text-xs text-muted-foreground'>-</span>
                <Calendar className='size-3 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>
                  {new Date(task.completedAt).toLocaleString('vi-VN')}
                </span>
              </>
            )}
          </div>
        </div>

        <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
          <Button
            variant='ghost'
            size='icon'
            className='shrink-0 transition-color size-8 text-muted-foreground hover:text-info'
            onClick={() => {
              setIsEditing(true);
              setUpdateTitle(task.title || '');
            }}
          >
            <SquarePen className='size-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='shrink-0 transition-color size-8 text-muted-foreground hover:text-destructive'
            onClick={() => deleteTask(task._id)}
          >
            <Trash className='size-4' />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
