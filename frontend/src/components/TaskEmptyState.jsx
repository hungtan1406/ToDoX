import React from 'react';
import { Card } from './ui/card';
import { Circle } from 'lucide-react';

function TaskEmptyState({ filter }) {
  return (
    <Card className='p-8 text-center border-0 bg-gradient-card shadow-custom-md'>
      <div className='space-y-3'>
        <Circle className='mx-auto size-12 text-muted-foreground' />
        <div>
          <h3 className='font-medium text-foreground'>
            {filter === 'active'
              ? 'Không có nhiệm vụ nào đang làm!'
              : filter === 'completed'
              ? 'Không có nhiệm vụ đã hoàn thành!'
              : 'Không có nhiệm vụ nào!'}
          </h3>
          {/* <p className='text-sm text-muted-foreground'>
            {filter === 'all'
              ? 'Thêm nhiệm vụ đầu tiên vào danh sách'
              : `Chuyển sang "tất cả" để thấy những nhiệm vụ ${
                  filter === 'active' ? 'đang làm' : 'đã hoàn thành'
                }.`}
          </p> */}
        </div>
      </div>
    </Card>
  );
}

export default TaskEmptyState;
