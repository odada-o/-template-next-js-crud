import { NextResponse } from 'next/server';
import posts from '@/data/posts';

// 특정 게시글 조회
export async function GET(request, { params }) {
  try {
    // URL 파라미터로 전달된 id 값과 일치하는 게시글 찾기
    const post = posts.find(p => p.id === parseInt(params.id));
    
    // 게시글이 없을 경우 404 응답
    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: '게시글을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 게시글 수정
export async function PUT(req, { params }) {
  try {
    // 요청 데이터를 JSON으로 파싱
    const data = await req.json();
    // URL 파라미터로 전달된 id 값과 일치하는 게시글의 인덱스 찾기
    const index = posts.findIndex(p => p.id === parseInt(params.id));
    
    // index가 -1이면 게시글이 없다는 의미
    if (index === -1) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // posts 배열의 index 위치에 있는 게시글 수정
    posts[index] = {
      ...posts[index], // 기존 게시글 정보
      title: data.title || posts[index].title, // or 연산자로 값이 없을 경우 기존 값 유지
      content: data.content || posts[index].content // or 연산자로 값이 없을 경우 기존 값 유지
    };
    
    // 수정된 게시글 응답
    return NextResponse.json(posts[index]);
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 게시글 삭제
export async function DELETE(req, { params }) {
  try {
    const index = posts.findIndex(p => p.id === parseInt(params.id));
    
    if (index === -1) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    // index 위치에 있는 게시글 삭제
    posts.splice(index, 1);
    // 삭제 성공 메시지 응답
    return NextResponse.json({ message: '게시글이 삭제되었습니다.' });
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}