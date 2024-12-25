import mongoose from 'mongoose';

// 이미 모델이 있다면 그것을 사용, 없다면 새로 생성
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '제목을 입력해주세요.'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, '내용을 입력해주세요.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);