import { useEffect, useState } from 'react';
import categorias_array from '../../helpers/categorias';
import type { Categoria } from '../../types/Categoria';
import CategoriaCard from '../../components/CategoriaCard/CategoriaCard';

const Dashboard = () => {
   const [categorias, setCategorias] = useState<Categoria[]>([]);

   useEffect(() => {
      setCategorias(categorias_array);
   }, []);

   return (
      <>
         <div className="w-screen h-[calc(100vh-68px)] flex ">
            <div className="h-[calc(100% - 68px)] w-3/4 m-4 flex flex-col gap-6">
               <div className="min-h-[20rem] w-full flex flex-col gap-2">
                  <h2 className="text-4xl">Categorias</h2>
                  <div className="h-[18rem] flex flex-nowrap overflow-x-scroll overflow-y-visible">
                     {categorias.map((categoria, index) => (
                        <CategoriaCard
                           key={index}
                           nombre={categoria.nombre}
                           imagen={categoria.imagen}
                        />
                     ))}
                  </div>
               </div>
            </div>
            <div className="h-[calc(100% - 68px)] w-1/4 m-4 bg-blue-500 rounded-xl">
               <h2>usuarios</h2>
            </div>
         </div>
      </>
   );
};

export default Dashboard;
