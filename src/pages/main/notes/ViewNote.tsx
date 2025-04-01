import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  category: string;
  content: string;
}

export default function ViewNote() {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const noteToView = storedNotes.find((note: Note) => note.id === id);
    setNote(noteToView || null);
  }, [id]);

  return (
    <main className=" p-6 flex flex-col items-center bg-gray-100 ">
      <div className="max-w-2xl w-full space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center">View Note</h1>
        {note ? (
          <div>
            <h2 className="text-xl font-bold text-black">{note.title}</h2>
            <p className="text-sm text-[#52AE77]">{note.category}</p>
            <p className="text-lg mt-4 text-black">{note.content}</p>
          </div>
        ) : (
          <p>Loading note...</p>
        )}
      </div>
    </main>
  );
}
