import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useTranslation } from "react-i18next";
import NotesSection from "./NotesSection";

const Favorites = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const { t } = useTranslation();
  const favoriteNotes = notes.filter((note) => note.isFavorite);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t("HomeAi.Favorite Tasks")}</h1>
      <NotesSection notes={favoriteNotes} t={t} />
    </div>
  );
};

export default Favorites;
