'use client';

import { useEffect, useState } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/naver'); // API 호출
        const data = await response.json();

        // 데이터가 배열인지 확인
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error('Unexpected data format:', data);
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">네이버 블로그 글</h1>
      <div>
        {posts.map((post, index) => (
          <div key={index} className="mb-4">
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </a>
            <p className="text-sm text-gray-600">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
