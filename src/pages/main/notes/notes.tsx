import { useEffect, useState } from "react";
import { FaPlus, FaPen, FaRedo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Notes() {
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState<{ id: string; title: string; content: string; category: string }[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  const handleAddNote = () => {
    if (!title.trim() || !note.trim()) return;

    const newNote = { id: uuidv4(), title, content: note, category };
    setNotes([...notes, newNote]);
    setTitle("");
    setNote("");
    setCategory("");

    navigate("/my-notes", { state: { notes: [...notes, newNote] } });
  };
  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <div className="max-w-xl w-full space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Create Note</h1>
        
        <input 
          type="text" 
          className="input input-bordered bg-white text-gray-700 w-full border-gray-300 p-4" 
          placeholder="Enter note title..." 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea 
          className="textarea textarea-bordered bg-white text-gray-700 w-full border-gray-300 p-4"
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        
        <div className="flex gap-2">
          <button className="btn bg-[#52AE77] border-black hover:bg-[#7ab993] border-2 flex items-center gap-2">
            <img src="/icon/mice.svg" alt="mice" /> Record Voice
          </button>
          <button
            className="btn btn-outline border-2 text-[#52AE77] hover:bg-amber-50 flex items-center gap-2">
            <FaPen /> Write Text
          </button>
        </div>
        
        <div className="space-y-2 text-black">
          <label className="label-text text-black">Category</label>
          {['Work', 'Personal', 'Misc'].map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <input 
                type="radio" 
                name="category" 
                className="radio text-[#52AE77] bg-white border-[#52AE77]" 
                checked={category === cat} 
                onChange={() => setCategory(cat)}
              />
              <p>{cat}</p>
            </div>
          ))}
          
          <div className="flex gap-2">
            <input 
              type="text" 
              className="input input-bordered bg-white border-gray-300 flex-1" 
              placeholder="Title your category..." 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            />
            <button className="btn text-white bg-[#52AE77] border-black hover:bg-[#7ab993] border-2 flex items-center gap-2">
              <FaPlus />
            </button>
          </div>
        </div>
        
        <button 
          onClick={handleAddNote} 
          className="btn text-white w-full bg-[#52AE77] border-black hover:bg-[#7ab993] border-2 flex items-center gap-2">
          <FaPlus /> Add Note
        </button>
      </div>
      
      <div className="max-w-xl w-full mt-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes added yet.</p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">{note.title}</h2>
              <p className="text-sm text-[#52AE77]">{note.category}</p>
            </div>
          ))
        )}
      </div>

      <div className="max-w-xl w-full mt-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">AI Summarization</h1>
        
        <input 
          type="text" 
          className="input input-bordered bg-white w-full border-gray-300 text-gray-700" 
          placeholder="Enter text to summarize..." 
        />
        
        <div className="flex gap-2">
          <button className="btn btn-outline text-[#52AE77] hover:bg-amber-50 border-2 flex items-center gap-2">
            <FaPen /> Edit
          </button>
          <button className="btn bg-[#52AE77] border-2 border-black flex items-center gap-2">
            <FaRedo /> Regenerate
          </button>
        </div>
      </div>
    </main>
  );
}