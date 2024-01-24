import React, { useState } from "react";
import TextInput from "../Components/InputField/TextInput";
import PasswordInput from "../Components/InputField/PasswordInput";
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi";
import OR from "../Components/Other/OR";
import CircleCheckbox from "../Components/Checkbox/CircleCheckbox";
import ContinueWithGoogleButton from "../Components/Button/ContinueWithGoogleButton";
import SubmitButton from "../Components/Button/SubmitButton";

function Enter() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send formData to backend
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center mt-12">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex-1 w-80 flex flex-col">
            <TextInput
              placeholder="Email or Username"
              icon={<FaUser />}
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
            />
            <PasswordInput
              placeholder="Password"
              icon={<HiLockClosed />}
              showPass={1}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="mb-6 flex justify-between">
              <CircleCheckbox
                label={"Remember Me"}
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="block text-sm font-medium text-main_link_color_dark">
                Forget Your Password?
              </span>
            </div>
            <SubmitButton title={"Sign In"} />
            <OR />
            <ContinueWithGoogleButton />
          </div>
        </form>
      </div>
      <p className="text-main_font_color_dark mx-auto text-xs mt-16 md:text-base max-w-sm md:max-w-lg text-center">
        Shoubra, Benha University engineers are building a collaborative Online
        Judge System, emphasizing teamwork and skill development. See our{" "}
        <span className="text-main_link_color_dark">privacy policy</span> for
        details.
      </p>
    </div>
  );
}

export default Enter;