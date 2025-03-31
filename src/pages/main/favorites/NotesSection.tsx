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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center col-span-2">{t("HomeAi.No Tasks Found")}</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="card bg-white shadow-lg border border-gray-200 rounded-lg p-6">
            <h2 className="text-gray-800 font-semibold">{note.title}</h2>
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
             <button className={`btn text-black hover:bg-[#45aa6d] hover:text-white  border-2 border-black ${note.completed ? "btn-success text-white bg-[#45aa6d]" : "btn-outline "}`} onClick={() => dispatch(toggleCompletion(note.id))}>
                             {note.completed ? <FaCheckCircle /> : <FaTimesCircle />} {note.completed ? t("HomeAi.Completed") : t("HomeAi.Incomplete")}
                           </button>
             <Link to={`/note/${note.id}`} className="btn bg-white hover:bg-gray-200 text-lg  text-black  border-2 border-black">
                             <FaEye /> {t("HomeAi.View")}
                           </Link>
              <button className="btn btn-outline text-lg   text-black hover:bg-gray-200  border-2 border-black" >
                              <FaShareAlt/>
                            </button>
              <button
                className="btn text-red-500 px-4 text-lg hover:bg-gray-200 bg-white py-2 rounded-md flex items-center gap-2"
                onClick={() => handleFavoriteToggle(note.id)}
              >
                {favorites.includes(note.id) ? <FaRegHeart className="text-lg" /> : <FaHeart className="text-lg" />}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesSection;