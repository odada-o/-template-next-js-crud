import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

// 전체 게시글 조회
export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find({}).sort({ createdAt: -1 });
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
    await connectDB();
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
    const post = await Post.create(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 작성에 실패했습니다.' },
      { status: 500 }
    );
  }
}