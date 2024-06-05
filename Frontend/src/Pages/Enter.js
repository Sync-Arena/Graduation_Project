import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../Components/InputField/TextInput";
import PasswordInput from "../Components/InputField/PasswordInput";
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi";
import OR from "../Components/Other/OR";
import CircleCheckbox from "../Components/Checkbox/CircleCheckbox";
import ContinueWithGoogleButton from "../Components/Button/ContinueWithGoogleButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../Context/AuthProvider";
import axios from "axios";

function Enter() {
  const [loginFormData, setLoginFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false
  });
  const [message, setMessage] = useState("");
  const [pathname, setPathname] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    setMessage(params.get("message"));
    setPathname(params.get("redirectTo"));
    if (auth.signedIn && params.get("redirectTo")) {
      navigate(`${params.get("redirectTo")}`);
    }
  }, [auth.signedIn, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { emailOrUsername, password } = loginFormData;
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/signin`,
        JSON.stringify({ userNameOrEmail: emailOrUsername, password: password }),
        {
          headers: { 'Content-Type': 'application/json' },
        });
      console.log(res.data.data);
      setAuth({ userData: res.data, signedIn: true });
      sessionStorage.setItem("userInfo", JSON.stringify(res.data));
      pathname ? navigate(pathname) : navigate('/');
    } catch (err) {
      setMessage(`${err.request.status} : ${err.request.statusText}`);
    } finally {
      setLoading(false);
    }
    console.log(loginFormData);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-center mt-12">
        {message &&
          <div className="flex items-center justify-center bg-red-800 text-white font-bold px-16 py-3 rounded-md" role="alert">
            <FontAwesomeIcon icon={faCircleExclamation} className='text-2xl mr-3' />
            <p>{message}</p>
          </div>
        }
      </div>
      <div className="flex-grow flex flex-col justify-center items-center mt-8">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex-1 w-80 flex flex-col">
            <TextInput
              placeholder="Email or Username"
              icon={<FaUser />}
              name="emailOrUsername"
              value={loginFormData.emailOrUsername}
              onChange={handleChange}
            />
            <PasswordInput
              placeholder="Password"
              icon={<HiLockClosed />}
              showPass={1}
              name="password"
              value={loginFormData.password}
              onChange={handleChange}
            />
            <div className="mb-6 flex justify-between">
              <CircleCheckbox
                label={"Remember Me"}
                name="rememberMe"
                value={loginFormData.rememberMe}
                onChange={handleChange}
              />
              <span className="block text-sm font-medium text-main_link_color_dark">
                Forget Your Password?
              </span>
            </div>
            <button
              type="submit"
              className="mb-6 bg-gradient-to-r from-main_heighlight_color_dark to-main_link_color_dark border-0 rounded-md block w-full p-2 text-main_font_color_dark font-semibold"
              style={loading ? { backgroundImage: "none", backgroundColor: "#393939" } : null}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <OR />
            <ContinueWithGoogleButton />
          </div>
        </form>
        <p className="text-main_font_color_dark mx-auto text-xs mt-16 md:text-base max-w-sm md:max-w-lg text-center">
          Shoubra, Benha University engineers are building a collaborative Online
          Judge System, emphasizing teamwork and skill development. See our{" "}
          <span className="text-main_link_color_dark">privacy policy</span> for
          details.
        </p>
      </div>
    </div>
  );
}

export default Enter;
