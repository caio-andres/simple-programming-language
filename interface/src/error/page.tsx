import { Link } from "react-router-dom";

export const Error: React.FC = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Página não encontrada.</h2>
      <Link to="/">Volte para a página principal</Link>
    </div>
  );
};
