import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Background from "../../components/Background/Background";
import LoginForm from "../../components/LoginForm/LoginForm";
import MenVir from "../../components/MenVir/MenVir";
import Chatbot from "../../components/Chatbot/Chatbot";

export default function Login() {
  const { user } = useUser();
  const navigate = useNavigate();
  // Define your API URL here or import it from your config
  const apiUrl = import.meta.env.VITE_API_URL || "localhost:3001";
  const baseURL = `${window.location.protocol}//${apiUrl}/api`;

  if (user) {
    navigate("/panel");
    return null;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-end">
      <div className="w-full h-full flex flex-col justify-start">
        <h1 className="title leading-none pt-[9vh] flex-none">MentorHub</h1>
        <h2 className="subtitle z-10 flex-none">Ingreso</h2>
        <div className="flex min-w-[90%] h-full w-full overflow-hidden panel-text">
          <div className="flex flex-col justify-between items-center gap-[1.7vh] w-full overflow-auto">
            <LoginForm />
            <div className="flex flex-col gap-[1.7vh] mt-[1.7vh]">
              <p className="w-fit self-center">o continúa con</p>
              <div className="flex justify-center gap-[1.7vh]">
                <a
                  href={`${baseURL}/auth/google`}
                  className="flex justify-center items-center px-14 py-2 rounded-full border-2 hover:border-[#007AFF]"
                >
                  <img
                    className="h-[3.14vh] aspect-square w-fit"
                    width={30}
                    height={30}
                    src="/google-icon.svg"
                    alt="Google Sign In"
                  />
                </a>
                <a
                  href={`${baseURL}/auth/github`}
                  className="flex justify-center items-center px-14 py-2 rounded-full border-2 hover:border-[#007AFF]"
                >
                  <img
                    className="h-[3.14vh] aspect-square w-fit"
                    width={30}
                    height={30}
                    src="/github-icon.svg"
                    alt="Github Sign In"
                  />
                </a>
                {/*                   <a
                    href=""
                    className="flex justify-center items-center px-14 py-2 rounded-full border-2 hover:border-[#007AFF]"
                  >
                    <img
                      className="h-[3.14vh] aspect-square w-fit"
                      width={30}
                      height={30}
                      src="/facebook-icon.svg"
                      alt="Facebook Sign In"
                    />
                  </a> */}
              </div>
              <p className="w-fit self-center">
                ¿Aún no tienes cuenta?{" "}
                <a
                  className="text-[#007AFF] hover:underline underline-offset-2"
                  href="/register"
                >
                  Regístrate gratis.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Background>
        <MenVir src="/MenVir_Saludando.webm" />
      </Background>
      <div className="absolute inset-0 flex flex-col items-center justify-center panel"></div>
      <Chatbot />
    </div>
  );
}
