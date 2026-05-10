import { useEffect, useState } from "react";
import { updateGame } from "../services/gameService";

function UpdateGameModal({ game, onClose, onGameUpdated }) {
  const [form, setForm] = useState(game);

  useEffect(() => {
    setForm(game);
  }, [game]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateGame(game.id, form);

    onGameUpdated();
    onClose();
  };

  if (!game) return null;

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded w-96">
        <h2 className="text-xl mb-4">Update Game</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="p-2 w-full"
          />

          <input
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className="p-2 w-full"
          />

          <button className="bg-blue-500 px-4 py-2 text-white">Update</button>
        </form>

        <button onClick={onClose} className="mt-2 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
}

export default UpdateGameModal;
