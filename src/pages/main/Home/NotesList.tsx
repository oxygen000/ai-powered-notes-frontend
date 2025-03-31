import React, { useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, toggleCompletion, toggleFavorite } from "../../../redux/notes/notesSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../redux/store";
import LanguageSwitcher from "../../../components/LanguageSwitcher/LanguageSwitcher";
import { FaPlusCircle, FaCheckCircle, FaTimesCircle, FaEye, FaShareAlt, FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";


const NotesList: React.FC = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state: RootState) => state.notes);
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const completedNotes = notes.filter((note) => note.completed);
  const incompleteNotes = notes.filter((note) => !note.completed);

  return (
    <div className="p-6 ">
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

      <div className="tabs tabs-boxed text-white mb-4 bg-[#52AE77] rounded-2xl">
        <button className={`tab   ${selectedTab === "all" ? "tab-active" : ""}`} onClick={() => setSelectedTab("all")}>
          {t("HomeAi.All Tasks")}
        </button>
        <button className={`tab  ${selectedTab === "completed" ? "tab-active" : ""}`} onClick={() => setSelectedTab("completed")}>
          {t("HomeAi.Completed Tasks")}
        </button>
        <button className={`tab   ${selectedTab === "incomplete" ? "tab-active" : ""}`} onClick={() => setSelectedTab("incomplete")}>
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

const NotesSection: React.FC<{ notes: Note[]; dispatch: Dispatch<ReturnType<typeof addNote | typeof toggleCompletion | typeof toggleFavorite>>; t: (key: string) => string }> = ({ notes, dispatch, t }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="container grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.length === 0 ? (
         <motion.p initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-gray-500 text-center col-span-2">
         {t("HomeAi.No Tasks Found")}
       </motion.p>
      ) : (
        notes.map((note) => (
          <motion.div key={note.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="card bg-white shadow-lg border border-gray-200 rounded-lg p-6">
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
            <motion.button whileTap={{ scale: 0.9 }} className={`btn border-2 border-black px-4 py-2 rounded-md flex items-center gap-2 ${note.completed ? "bg-[#52AE77] text-white" : "bg-white text-gray-800"}`} onClick={() => dispatch(toggleCompletion(note.id))}>
                  {note.completed ? <FaCheckCircle className="text-lg" /> : <FaTimesCircle className="text-lg" />}
                  {note.completed ? t("HomeAi.Completed") : t("HomeAi.Incomplete")}
                </motion.button>
              <Link to={`/note/${note.id}`} className="btn bg-white hover:bg-gray-200 text-lg  text-black  border-2 border-black">
                <FaEye /> {t("HomeAi.View")}
              </Link>
              <motion.button whileTap={{ scale: 0.9 }} className="btn text-red-500 px-4 text-lg hover:bg-gray-200 bg-white py-2 rounded-md flex items-center gap-2" onClick={() => dispatch(toggleFavorite(note.id))}>
                {note.isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} className="btn border-2 border-black bg-white text-black px-4 py-2 rounded-md flex items-center gap-2">
                  <FaShareAlt className="text-lg" />
                </motion.button>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default NotesList;
