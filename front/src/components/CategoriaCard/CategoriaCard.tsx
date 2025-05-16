import type { Categoria } from '../../types/Categoria';

const CategoriaCard: React.FC<Categoria> = ({ nombre, imagen }) => {
   return (
      <div className="h-[15rem] aspect-square border-2 m-2 rounded-3xl">
         <img src={imagen} alt={nombre} className="h-full object-cover" />
         <h3 className="z-10">{nombre}</h3>
      </div>
   );
};

export default CategoriaCard;
