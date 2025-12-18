export default function NoticeCard({ notice, onDelete }) {
  return (
    <div className="bg-gray-800 p-5 rounded-xl">
      <h3 className="text-xl font-semibold">{notice.title}</h3>
      <p className="text-gray-300 mt-2">{notice.message}</p>

      {notice.fileUrl && (
        <a
          href={notice.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 underline mt-2 block"
        >
          Download Attachment
        </a>
      )}

      <button
        onClick={() => onDelete(notice.id)}
        className="mt-4 text-red-400 hover:text-red-600"
      >
        Delete
      </button>
    </div>
  );
}
