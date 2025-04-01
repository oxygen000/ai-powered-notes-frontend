import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  category: string;
  content: string;
}

export default function MyNote() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    if (location.state?.notes) {
      const newNotes = [...storedNotes, ...location.state.notes];
      localStorage.setItem("notes", JSON.stringify(newNotes));
      setNotes(newNotes);
    } else {
      setNotes(storedNotes);
    }
  }, [location.state]);

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    localStorage.setItem("notes", JSON.stringify(notes.filter((note) => note.id !== id)));
  };

  const handleEditNote = (id: string) => {
    navigate(`/edit-note/${id}`);
  };

  const handleViewNote = (id: string) => {
    navigate(`/view-note/${id}`);
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center bg-gray-100">
      <div className="max-w-2xl w-full space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Notes List</h1>
        {notes.length === 0 ? (
          <div className="alert alert-info shadow-lg">
            <span>No notes added yet.</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {notes.map((note, index) => (
              <div key={index} className="card bg-white shadow-xl border border-gray-300">
                <div className="card-body">
                  <h2 className="card-title text-gray-700">{note.title}</h2>
                  <p className="card-body text-gray-700 font-medium">{note.content}</p>
                  <p className="text-sm text-[#52AE77] font-medium">{note.category}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditNote(note.id)}
                      className="btn btn-outline border-2 text-blue-500 flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="btn btn-outline border-2 text-red-500 flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                    <button
                      onClick={() => handleViewNote(note.id)}
                      className="btn btn-outline border-2 text-green-500 flex items-center gap-2"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
