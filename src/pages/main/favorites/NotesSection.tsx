import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleCompletion, toggleFavorite } from "../../../redux/notes/notesSlice";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaEye, FaShareAlt, FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";

interface Note {
  id: number;
  title: string;
  text: string;
  date: string;
  completed: boolean;
  rating: number;
  isFavorite: boolean;
}

interface NotesSectionProps {
  notes: Note[];
  t: (key: string) => string;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, t }) => {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleFavoriteToggle = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]));
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="mt-4 text-black grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center col-span-2">{t("HomeAi.No Tasks Found")}</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="card bg-white shadow-lg border border-gray-200 rounded-lg">
            <div className="card-body p-6">
              <h2 className="card-title text-gray-800 font-semibold">{note.title}</h2>
              <p className="text-gray-700">{note.text}</p>
              <small className="text-gray-500 block mt-2">{t("HomeAi.Date")}: {note.date}</small>
              <div className="mt-3 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-yellow-500 text-xl">
                    {star <= note.rating ? <FaStar /> : <FaRegStar />}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-3 flex-wrap">
                <button
                  className={`btn ${note.completed ? "bg-[#52AE77] text-white" : "bg-white text-gray-800"} px-4 py-2 rounded-md flex items-center gap-2`}
                  onClick={() => dispatch(toggleCompletion(note.id))}
                >
                  {note.completed ? <FaCheckCircle className="text-lg" /> : <FaTimesCircle className="text-lg" />}
                  {note.completed ? t("HomeAi.Completed") : t("HomeAi.Incomplete")}
                </button>
                <Link to={`/note/${note.id}`} className="btn bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
                  <FaEye className="text-lg" />
                  {t("HomeAi.View")}
                </Link>
                <button className="btn border border-black bg-white text-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
                  <FaShareAlt className="text-lg" />
                  {t("HomeAi.Share")}
                </button>
                <button className="btn text-red-500 px-4 bg-white py-2 rounded-md flex items-center gap-2" onClick={() => handleFavoriteToggle(note.id)}>
                  {favorites.includes(note.id) ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesSection;