import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';

// 게시글 ID 유효성 검사 함수
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/posts/[id] - 특정 게시글 조회
export async function GET(req, { params }) {
  try {
    // mongoDB 연결
    await connectDB();

    // params를 비동기로 처리
    const resolvedParams = await Promise.resolve(params);
    // const id = resolvedParams.id;

    if (!isValidObjectId(resolvedParams.id)) {
      return NextResponse.json(
        { error: '유효하지 않은 게시글 ID입니다.' },
        { status: 400 }
      );
    }

    const post = await Post.findById(resolvedParams.id);
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

// PUT /api/posts/[id] - 게시글 수정
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await Promise.resolve(params);

    if (!isValidObjectId(resolvedParams.id)) {
      return NextResponse.json(
        { error: '유효하지 않은 게시글 ID입니다.' },
        { status: 400 }
      );
    }

    const data = await req.json();
    const post = await Post.findByIdAndUpdate(
      resolvedParams.id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - 게시글 삭제
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await Promise.resolve(params);

    if (!isValidObjectId(resolvedParams.id)) {
      return NextResponse.json(
        { error: '유효하지 않은 게시글 ID입니다.' },
        { status: 400 }
      );
    }

    const post = await Post.findByIdAndDelete(resolvedParams.id);
    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '게시글이 삭제되었습니다.' });
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}