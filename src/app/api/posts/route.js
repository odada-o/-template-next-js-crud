import { NextResponse } from 'next/server';
import posts from '@/data/posts';

// 전체 게시글 조회
export async function GET() {
  try {
    // 게시글 목록을 JSON 형식으로 응답
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: '게시글을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 새 게시글 작성
export async function POST(req) {
  try {
    // 요청 데이터를 JSON으로 파싱
    const data = await req.json();

    // 필수값 검사
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: '제목과 내용은 필수입니다.' },
        { status: 400 }
      );
    }

    // 새 게시글 생성
    const newPost = {
      id: posts.length + 1,
      title: data.title,
      content: data.content,
      createdAt: new Date().toLocaleDateString()
    };
    
    posts.push(newPost);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 작성에 실패했습니다.' },
      { status: 500 }
    );
  }
}