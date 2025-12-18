import { useEffect, useState } from "react";
import NoticeForm from "../components/NoticeForm";
import NoticeCard from "../components/NoticeCard";
import { getNotices, deleteNotice } from "../services/noticeService";

export default function Notices() {
  const [notices, setNotices] = useState([]);

  const load = async () => {
    const res = await getNotices();
    setNotices(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <NoticeForm onSuccess={load} />

      <div className="grid gap-4">
        {notices.map((n) => (
          <NoticeCard
            key={n.id}
            notice={n}
            onDelete={async (id) => {
              await deleteNotice(id);
              load();
            }}
          />
        ))}
      </div>
    </div>
  );
}
