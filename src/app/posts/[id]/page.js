'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function PostDetailPage({ params }) {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // `params` Promise 처리
  const [resolvedParams, setResolvedParams] = useState(null);

  useEffect(() => {
    params.then((unwrappedParams) => {
      setResolvedParams(unwrappedParams);
    });
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    axios
      .get(`/api/posts/${resolvedParams.id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
        alert('게시글을 불러올 수 없습니다.');
        router.push('/posts');
      });
  }, [resolvedParams]);

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await axios.delete(`/api/posts/${resolvedParams.id}`);
      if (response.status === 200) {
        router.push('/posts');
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>작성일: {post.createdAt}</p>
      <div>
        <p>{post.content}</p>
      </div>
      <div>
        <Link href="/posts">목록</Link>
        <Link href={`/posts/${post.id}/edit`}>수정</Link>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
}
