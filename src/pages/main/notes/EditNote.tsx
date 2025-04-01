import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  category: string;
  content: string;
}

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const noteToEdit = storedNotes.find((note: Note) => note.id === id);
    if (noteToEdit) {
      setNote(noteToEdit);
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategory(noteToEdit.category);
    }
  }, [id]);

  const handleSaveNote = () => {
    if (note) {
      const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
      const updatedNotes = storedNotes.map((storedNote: Note) =>
        storedNote.id === note.id ? { ...storedNote, title, content, category } : storedNote
      );
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      navigate("/my-notes");
    }
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center bg-gray-100">
      <div className="max-w-2xl w-full space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Edit Note</h1>
        {note ? (
          <div>
            <input
              type="text"
              className="input input-bordered w-full mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Note content"
            />
            <div className="mb-4">
              <select
                className="select select-bordered w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Misc">Misc</option>
              </select>
            </div>
            <button onClick={handleSaveNote} className="btn btn-outline text-blue-500">
              <FaSave /> Save Changes
            </button>
          </div>
        ) : (
          <p>Loading note...</p>
        )}
      </div>
    </main>
  );
}
