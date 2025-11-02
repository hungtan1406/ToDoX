import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectedRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Không tìm thấy access token' });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.userId).select('-hashedPassword');
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Access token đã hết hạn' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Access token không hợp lệ' });
    }
    console.error('Lỗi khi xác minh JWT:', err);
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};
