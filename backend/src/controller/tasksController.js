import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
  const { filter = 'today' } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case 'today': {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case 'week': {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case 'month': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    default: {
      startDate = null;
    }
  }

  const query = {
    user: req.user._id, // chỉ lấy task của user hiện tại
    ...(startDate ? { createdAt: { $gte: startDate } } : {}),
  };

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completedCount: [
            { $match: { status: 'completed' } },
            { $count: 'count' },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error('Lỗi khi gọi getAllTasks', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    // Validate input -> trả 400 thay vì để Mongoose validation error rơi vào catch (500)
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'Title không được để trống' });
    }

    const newTask = new Task({ title: title.trim(), user: req.user._id });
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Lỗi khi gọi createTask', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;

    if (status && !['active', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Status không hợp lệ' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, status, completedAt },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Lỗi khi gọi updateTask', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Lỗi khi gọi deleteTask', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
};
