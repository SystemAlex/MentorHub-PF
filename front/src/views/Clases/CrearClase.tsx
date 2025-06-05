import { useEffect, useRef, useState } from "react";
import { ImageIcon, Video, Paperclip } from "lucide-react";
import axiosInstance from "../../services/axiosInstance";
import type { CategoryType } from "../../types/CategoryType";
import type { MateriaType } from "../../types/MateriaType";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CrearClase() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [materiaId, setMateriaId] = useState("");
 
  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);
  const [allMaterias, setAllMaterias] = useState<MateriaType[]>([]);
  const [multimedia, setMultimedia] = useState<File[]>([]);

  const [suscripcionActiva, setSuscripcionActiva] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/categories`).then((res) => {
      setAllCategories(res.data.data);
    });
    axiosInstance.get(`/materias`).then((res) => {
      setAllMaterias(res.data);
    });
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.id) setTeacherId(storedUser.id);

    // CHEQUEA SI EL PROFESOR TIENE SUSCRIPCIÓN ACTIVA
    if (storedUser?.role === "teacher") {
      axiosInstance
        .get(`/payments/user/${storedUser.id}?page=1&limit=3`)
        .then((res) => {
          const pagos = res.data?.data || [];
          const ahora = new Date();
            interface PagoType {
            status: string;
            endDate: string;
            [key: string]: any;
            }

            const pagoActivo = (pagos as PagoType[]).find((p: PagoType) => {
            if (p.status !== "completed") return false;
            const endDate: Date = new Date(p.endDate);
            return endDate > ahora;
            });
          if (pagoActivo) {
            setSuscripcionActiva(true);
            // RESETEA EL CONTADOR SI TIENE SUSCRIPCIÓN ACTIVA
            localStorage.setItem("clases_creadas", "0");
          } else {
            setSuscripcionActiva(false);
            // Inicializa el contador solo si no existe
            if (!localStorage.getItem("clases_creadas")) {
              localStorage.setItem("clases_creadas", "0");
            }
          }
        })
        .catch(() => {
          setSuscripcionActiva(false);
        });
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setMultimedia((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  // LIMITE DE CLASES SOLO SI NO TIENE SUSCRIPCIÓN ACTIVA
  const checkLimiteClases = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser?.role === "teacher" && !suscripcionActiva) {
      let clases = parseInt(localStorage.getItem("clases_creadas") || "0");
      if (clases >= 1) {
        alert("Para crear más de una clase debes suscribirte. Serás redirigido a la suscripción.");
        toast.warning("Para crear más de una clase debes suscribirte. Serás redirigido a la suscripción.");
        setTimeout(() => {
          navigate("/suscripcion");
        }, 1500);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkLimiteClases()) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("teacherId", teacherId);
    formData.append("categoryId", categoryId);
    formData.append("materiaId", materiaId);
    for (const file of multimedia) {
      formData.append("multimedia", file);
    }
    try {
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      await axiosInstance.post("/classes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Clase creada correctamente");
      setTitle("");
      setDescription("");
      setCategoryId("");
      setMateriaId("");
      setMultimedia([]);
      // SOLO SUMA EL CONTADOR SI NO TIENE SUSCRIPCIÓN ACTIVA
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser?.role === "teacher" && !suscripcionActiva) {
        let clases = parseInt(localStorage.getItem("clases_creadas") || "0");
        localStorage.setItem("clases_creadas", String(clases + 1));
      }
    } catch (err) {
      alert("Error al crear la clase");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#007AFF] flex gap-4 px-6 py-8">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white border-4 border-blue-400 rounded-xl p-6 flex-1 shadow-lg"
      >
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-[#007AFF]">Crear Clase</h2>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            required
          >
            <option value="">Selecciona una categoría</option>
            {allCategories.map((categoria, index) => (
              <option key={index} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
          <select
            value={materiaId}
            onChange={(e) => setMateriaId(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            required
          >
            <option value="">Selecciona una materia</option>
            {allMaterias.map((materia, index) => (
              <option key={index} value={materia.id}>
                {materia.name}
              </option>
            ))}
          </select>
          
        </div>

        <input
          type="text"
          placeholder="Clase/Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 text-gray-700"
          required
        />
        <textarea
          placeholder="Descripción de la clase"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 text-gray-700 h-[200px] resize-none"
          required
        />

        <div className="flex items-center gap-4 mb-4">
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="bg-gray-100 p-2 rounded-full text-[#007AFF] hover:bg-gray-200"
          >
            <ImageIcon />
          </button>
          <input type="file" accept="image/*" ref={imageInputRef} onChange={handleFileChange} hidden />

          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="bg-gray-100 p-2 rounded-full text-[#007AFF] hover:bg-gray-200"
          >
            <Video />
          </button>
          <input type="file" accept="video/*" ref={videoInputRef} onChange={handleFileChange} hidden />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-100 p-2 rounded-full text-[#007AFF] hover:bg-gray-200"
          >
            <Paperclip />
          </button>
          <input type="file" accept=".pdf,.doc,.docx,.zip,.rar" ref={fileInputRef} onChange={handleFileChange} hidden />
        </div>

        {multimedia.length > 0 && (
          <ul className="text-sm text-gray-600 mb-4">
            {multimedia.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              setTitle("");
              setDescription("");
              setCategoryId("");
              setMateriaId("");
              setMultimedia([]);
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Publicar
          </button>
        </div>
      </form>
      <aside className="w-72 bg-white p-5 rounded-xl shadow-lg border border-gray-200">
        <h3 className="font-semibold mb-3 text-[#007AFF] text-lg">Sugerencias</h3>
        <ul className="space-y-3 text-sm text-blue-900">
          <li className="cursor-pointer hover:underline">Why having a blog on your website is more important than ever</li>
          <li className="cursor-pointer hover:underline">Top tips for rolling out a new brand voice across your business</li>
          <li className="cursor-pointer hover:underline">4 Ways to Up Your Personalization Game</li>
        </ul>
      </aside>
    </div>
  );
}
