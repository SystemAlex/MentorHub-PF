import { Formik, Form, Field, ErrorMessage } from 'formik';

interface LoginValues {
   email: string;
   password: string;
}

const initialValues: LoginValues = {
   email: '',
   password: '',
};

const validate = (values: LoginValues) => {
   const errors: Partial<LoginValues> = {};

   if (!values.email) {
      errors.email = 'El email es requerido';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Email inválido';
   }

   if (!values.password) {
      errors.password = 'La contraseña es requerida';
   } else if (values.password.length < 6) {
      errors.password = 'Mínimo 6 caracteres';
   }

   return errors;
};

export default function LoginForm() {
   const handleSubmit = (values: LoginValues) => {
      console.log('Datos enviados:', values);
   };

   return (
      <div className="w-full bg-white">
         <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
         >
            <Form className="space-y-4">
               <div>
                  <label htmlFor="email" className="block text-3xl font-medium">
                     Email
                  </label>
                  <Field
                     name="email"
                     id="email"
                     type="email"
                     placeholder="username@gmail.com"
                     className="w-full p-3 border rounded-full"
                  />
                  <ErrorMessage
                     name="email"
                     component="div"
                     className="text-red-500 text-sm"
                  />
               </div>

               <div>
                  <label
                     htmlFor="password"
                     className="block text-3xl font-medium"
                  >
                     Contraseña
                  </label>
                  <Field
                     name="password"
                     id="password"
                     type="password"
                     placeholder="Contraseña"
                     className="w-full p-3 border rounded-full"
                  />
                  <ErrorMessage
                     name="password"
                     component="div"
                     className="text-red-500 text-sm"
                  />
               </div>
               <p>¿Has olvidado tu contraseña?</p>
               <button
                  type="submit"
                  className="w-full text-3xl bg-blue-700 text-white py-3 rounded-full hover:bg-blue-800"
               >
                  Iniciar sesión
               </button>
            </Form>
         </Formik>
      </div>
   );
}
