import LoginForm from '../../components/LoginForm/LoginForm';

export default function Login() {
   return (
      <div className="h-screen w-screen flex items-center justify-center">
         <div className="w-3/5 flex flex-col gap-4 justify-between ps-[8rem] pe-[14rem]">
            <h1 className="text-8xl">MentorHub</h1>
            <h2 className="text-5xl">Login</h2>
            <LoginForm />
            <div className="flex flex-col gap-4 mt-8">
               <p className="w-fit self-center">o continúa con</p>
               <div className="flex justify-center gap-4">
                  <a href="" className="px-14 py-2 rounded-full border">
                     <img
                        width={30}
                        height={30}
                        src="/google-icon.svg"
                        alt="Google Sign In"
                     />
                  </a>
                  <a href="" className="px-14 py-2 rounded-full border">
                     <img
                        width={30}
                        height={30}
                        src="/github-icon.svg"
                        alt="Github Sign In"
                     />
                  </a>
                  <a href="" className="px-14 py-2 rounded-full border">
                     <img
                        width={30}
                        height={30}
                        src="/facebook-icon.svg"
                        alt="Facebook Sign In"
                     />
                  </a>
               </div>
               <p className="w-fit self-center">
                  ¿Aun no tienes cuenta? <a href="/register">Registrate gratis.</a>
               </p>
            </div>
         </div>
         <div className="h-screen w-2/5 bg-[#409BFF] relative">
            <svg
               viewBox="0 0 100 100"
               preserveAspectRatio="none"
               className="absolute top-0 left-0 w-full h-full"
            >
               <path d="M100,0 Q90,90 0,100 L0,0 Z" fill="#2463EB" />
            </svg>
            <video autoPlay loop muted playsInline className="menvirLogin">
               <source src="/MenVir_Saludando.webm" type="video/webm" />
            </video>
         </div>
      </div>
   );
}
