import { useState } from "react";
import { createGame } from "../services/gameService";

function AddGameModal({ onClose, onGameAdded }) {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    platform: "",
    thumbnail: "",
    short_description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createGame({
      ...form,
      id: Date.now(),
    });

    onGameAdded();
    onClose();
  };

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded w-96">
        <h2 className="text-xl mb-4">Add Game</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="p-2 text-black w-full"
          />

          <input
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
            className="p-2 text-black w-full"
          />

          <button className="bg-green-500 px-4 py-2 text-white">Add</button>
        </form>

        <button onClick={onClose} className="mt-2 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
}

export default AddGameModal;
