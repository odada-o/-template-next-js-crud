// app/posts/[id]/edit/page.js
import EditForm from "./editForm";

export default function EditPage({ params }) {
  return <EditForm postId={params.id} />;
}