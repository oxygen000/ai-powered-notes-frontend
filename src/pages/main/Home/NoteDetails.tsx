import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { toggleCompletion } from "../../../redux/notes/notesSlice";
import { FaCalendarAlt, FaStar, FaArrowLeft, FaCheckCircle, FaHeart, FaPlus, FaTrash, FaRegHeart } from "react-icons/fa";

const NoteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notes } = useSelector((state: RootState) => state.notes);
    const [favorites, setFavorites] = useState<number[]>([]);
  
    const toggleFavorite = (id: number) => {
      setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]));
    };
  const note = notes.find((n) => n.id === Number(id));
  const isLastTask = note && notes[notes.length - 1].id === note.id;

  // قائمة المهام الفرعية
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200 p-6">
        <div className="card w-full max-w-md p-6 text-center shadow-lg bg-white">
          <h1 className="text-2xl text-red-500 font-bold">❌ Task Not Found</h1>
          <p className="text-lg mt-2">The requested task does not exist.</p>
          <button onClick={() => navigate("/home")} className="btn btn-primary mt-4">
            <FaArrowLeft className="mr-2" /> Back to List
          </button>
        </div>
      </div>
    );
  }

  // إضافة مهمة جديدة
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  // حذف مهمة فرعية
  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex items-center text-black justify-center p-6">
      <div className="card w-full max-w-xl shadow-2xl bg-white">
        <div className="card-body">
          <h1 className="card-title text-3xl">{note.title}</h1>
          {isLastTask && <div className="badge badge-warning text-white">Last Task</div>}

          <p className="text-lg flex items-center gap-2 mt-3">
            {note.text}
          </p>

          {/* معلومات إضافية */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FaCalendarAlt className="text-[#52AE77]" />
              {note.date}
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={i < note.rating ? "text-yellow-500" : "text-gray-300"} />
              ))}
            </div>
          </div>

          {/* قائمة To-Do */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">To-Do Tasks</h2>
            <div className="flex gap-2">
              <input
                type="text"
                className="input input-bordered flex-grow bg-gray-100"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={addTask} className="btn bg-[#52AE77]">
                <FaPlus />
              </button>
            </div>
            <ul className="mt-3 space-y-2">
              {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks added yet.</p>
              ) : (
                tasks.map((task, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                    <span>{task}</span>
                    <button onClick={() => removeTask(index)} className="btn btn-xs btn-error">
                      <FaTrash />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* الأزرار */}
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => dispatch(toggleCompletion(note.id))} 
              className={`btn text-[#52AE77] border-black justify-center text-center  hover:bg-[#84c79f] ${note.completed ? "btn-success text-white bg-[#52AE77]" : "btn-outline "}`}
            >
              <FaCheckCircle className="mr-2" />
            </button>

           <button className="btn text-red-500 px-4 bg-white py-2 rounded-md flex items-center gap-2" onClick={() => toggleFavorite(note.id)}>
                             {favorites.includes(note.id) ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
                           </button>
          </div>
        </div>

        {/* زر العودة */}
        <div className="card-actions p-4">
          <button onClick={() => navigate("/home")} className="btn bg-[#52AE77] w-full">
            <FaArrowLeft className="mr-2" /> Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
