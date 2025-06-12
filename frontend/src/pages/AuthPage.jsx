import { useState } from "react";
import server from "../environment";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ user, setUser }) => {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    const res = await fetch(`${server.prod}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await res.json();
    console.log(result);
    if (result.token) {
      localStorage.setItem("token", result.token);
      navigate("/api/home");
    }
    setUser(result.user);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    const res = await fetch(`${server.prod}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await res.json();
    console.log(result);
    if (result.token) {
      localStorage.setItem("token", result.token);
      setUser(result.user);
      navigate("/api/home");
    }
    
  };

  return (
    <div className="">
      <div className="h-[80vh] w-[95vw] m-6 shadow-2xl not-sm:shadow-lg not-sm:m-0 not-sm:h-[70vh] overflow-hidden shadow-orange-400 rounded-lg p-6 not-sm:p-1 not-sm:grid-cols-1 grid grid-cols-2 items-center justify-center ">
        <div className="items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl not-sm:text-xl p-4 not-sm:p-1">Welcome!</h1>
            <div className="p-4 space-x-4 not-sm:p-1">
              <button
                className={
                  loginIsOpen
                    ? "underline decoration-orange-400 md:text-4xl"
                    : "md:text-4xl"
                }
                onClick={() => {
                  setLoginIsOpen(true);
                }}
              >
                Login
              </button>
              <button
                className={
                  !loginIsOpen
                    ? "underline decoration-orange-400 md:text-4xl"
                    : "md:text-4xl"
                }
                onClick={() => {
                  setLoginIsOpen(false);
                }}
              >
                Signup
              </button>
            </div>

            <div className="text-center">
              {loginIsOpen ? (
                <form
                  className="space-y-2 "
                  method="POST"
                  onSubmit={handleLogin}
                >
                  <input
                    type="text"
                    placeholder="Email"
                    className="text-sm p-1 border-2 rounded-lg border-gray-300"
                    name="email"
                    required
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Password"
                    className="text-sm p-1 rounded-lg border-2 border-gray-300"
                    name="password"
                    required
                  />
                  <br />
                  <button
                    type="submit"
                    className="w-fit sm:px-2 text-white bg-orange-400 border-2 border-orange-400 hover:scale-[95%] hover:text-orange-400 hover:bg-white  transition-transform rounded-xl"
                  >
                    Login
                  </button>
                </form>
              ) : (
                <form
                  className="space-y-2.5"
                  method="POST"
                  onSubmit={handleSignup}
                >
                  <input
                    type="text"
                    placeholder="Username"
                    name="name"
                    className="text-sm p-1 rounded-lg border-2 border-gray-300"
                    required
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Email"
                    className="text-sm p-1 rounded-lg border-2 border-gray-300"
                    name="email"
                    required
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="text-sm p-1 rounded-lg border-2 border-gray-300"
                    required
                  />
                  <br />{" "}
                  <button
                    type="submit"
                    className="w-fit sm:px-2 text-white bg-orange-400 border-2 border-orange-400 hover:scale-[95%] hover:text-orange-400 hover:bg-white  transition-transform rounded-xl"
                  >
                    Signup
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <div>
          <img
            src=".././images.jpeg"
            alt=""
            className="not-sm:hidden h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
