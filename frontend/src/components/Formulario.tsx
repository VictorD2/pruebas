import React, { FormEvent, ChangeEvent, useState } from "react";
import axios from "axios";

interface Video {
  nombre: string;
  image: File;
}

const Formulario = () => {
  const [video, setVideo] = useState<Video>({
    nombre: "",
    image: new File([""], "filename"),
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      video.image = e.target.files[0];
    }
  };

  const enviarVideo = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('nombre',video.nombre);
    fd.append('image',video.image);
    await axios.post('http://localhost:4000/api/videos',fd);
  };

  return (
    <div className="container bg-dark p-5">
      <form onSubmit={enviarVideo} encType="multipart/form-data">
        <div className="form-group mb-3">
          <input
            onChange={handleInputChange}
            className="form-control"
            type="text"
            placeholder="Nombre"
            name="nombre"
          />
        </div>
        <div className="form-group mb-3">
          <input
            onChange={handleFile}
            id="archivo"
            className="form-control"
            type="file"
            placeholder="Nombre"
            name="image"
          />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary">
            Enviar Datos
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
