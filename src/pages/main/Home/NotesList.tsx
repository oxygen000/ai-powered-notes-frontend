import React, { useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, toggleCompletion, toggleFavorite } from "../../../redux/notes/notesSlice";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../redux/store";
import LanguageSwitcher from "../../../components/LanguageSwitcher/LanguageSwitcher";
import { FaPlusCircle, FaCheckCircle, FaTimesCircle, FaEye, FaShareAlt, FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";

const NotesList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notes } = useSelector((state: RootState) => state.notes);
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const completedNotes = notes.filter((note) => note.completed);
  const incompleteNotes = notes.filter((note) => !note.completed);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          className="btn bg-[#52AE77] border-[#000000] hover:bg-[#7ab993] border flex items-center gap-2"
          onClick={() => dispatch(addNote())}
        >
          <FaPlusCircle className="text-xl" />
          <span>{t("HomeAi.Add Task")}</span>
        </button>
        
        <LanguageSwitcher />
      </div>

      <div className="tabs text-black tabs-boxed mb-4">
        <button className={`tab ${selectedTab === "all" ? "tab-active" : ""}`} onClick={() => setSelectedTab("all")}>
          {t("HomeAi.All Tasks")}
        </button>
        <button className={`tab ${selectedTab === "completed" ? "tab-active" : ""}`} onClick={() => setSelectedTab("completed")}>
          {t("HomeAi.Completed Tasks")}
        </button>
        <button className={`tab ${selectedTab === "incomplete" ? "tab-active" : ""}`} onClick={() => setSelectedTab("incomplete")}>
          {t("HomeAi.Incomplete Tasks")}
        </button>
      </div>

      {selectedTab === "all" && <NotesSection notes={notes} dispatch={dispatch} t={t} />}
      {selectedTab === "completed" && <NotesSection notes={completedNotes} dispatch={dispatch} t={t} />}
      {selectedTab === "incomplete" && <NotesSection notes={incompleteNotes} dispatch={dispatch} t={t} />}
    </div>
  );
};

interface Note {
  id: number;
  title: string;
  text: string;
  date: string;
  rating: number;
  completed: boolean;
  isFavorite: boolean;
}

const NotesSection: React.FC<{ notes: Note[]; dispatch: Dispatch; t: (key: string) => string }> = ({ notes, dispatch, t }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="mt-4 flex gap-3">
              <button className={`btn text-black hover:bg-[#45aa6d] hover:text-white  border-2 border-black ${note.completed ? "btn-success text-white bg-[#45aa6d]" : "btn-outline "}`} onClick={() => dispatch(toggleCompletion(note.id))}>
                {note.completed ? <FaCheckCircle /> : <FaTimesCircle />} {note.completed ? t("HomeAi.Completed") : t("HomeAi.Incomplete")}
              </button>
              <Link to={`/note/${note.id}`} className="btn btn-info bg-[#45aa6d] text-white  border-2 border-black">
                <FaEye /> {t("HomeAi.View")}
              </Link>
              <button className="btn btn-outline bg-[#45aa6d] text-white  border-2 border-black" onClick={() => dispatch(toggleFavorite(note.id))}>
                {note.isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
              <button className="btn btn-outline bg-[#45aa6d] text-white  border-2 border-black" >
                <FaShareAlt/>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesList;
