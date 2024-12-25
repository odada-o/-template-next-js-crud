// app/posts/[id]/edit/page.js
import { use } from "react";
import EditForm from "./editForm";

export default function EditPage({ params }) {// params를 비동기로 처리
  const resolvedParams = use(params);
  return <EditForm postId={resolvedParams.id} />;
}