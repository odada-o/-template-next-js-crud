'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/posts')
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await axios.delete(`/api/posts/${id}`);
      if (response.status === 200) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>게시글 목록</h1>
      <Link href="/posts/write">글쓰기</Link>

      <div>
        {posts.map((post) => (
          <Link
              key={post._id}
              href={`/posts/${post._id}`}
              className="cursor-pointer block"  // block 추가하여 전체 영역 클릭 가능하게
            >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
