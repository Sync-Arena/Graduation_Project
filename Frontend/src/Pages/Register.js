import React, { useState } from "react";
import TextInput from "../Components/InputField/TextInput";
import PasswordInput from "../Components/InputField/PasswordInput";
import EmailInput from "../Components/InputField/EmailInput";
import PasswordWithPopover from "../Components/InputField/PasswordWithPopover";
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import OR from "../Components/Other/OR";
import ContinueWithGoogleButton from "../Components/Button/ContinueWithGoogleButton";
import SubmitButton from "../Components/Button/SubmitButton";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...formDataToSend } = formData;
    // send formData to backend (excluding confirmPassword)
    console.log("Form data submitted:", formDataToSend);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center mt-10">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex-1 w-80 flex flex-col">
            <TextInput
              placeholder="Username"
              icon={<FaUser />}
              name="username"
              onChange={handleChange}
            />
            <EmailInput
              placeholder="Email"
              icon={<MdEmail />}
              name="email"
              onChange={handleChange}
            />
            <PasswordWithPopover
              placeholder="Password"
              icon={<HiLockClosed />}
              name="password"
              onChange={handleChange}
            />
            <PasswordInput
              placeholder="Confirm Password"
              icon={<HiLockClosed />}
              name="confirmPassword"
              onChange={handleChange}
            />
            <SubmitButton title={"Sign Up"} />
            <OR />
            <ContinueWithGoogleButton />
          </div>
        </form>
      </div>
      <p className="text-main_font_color_dark mx-auto text-xs mt-12 md:text-base max-w-sm md:max-w-lg text-center">
        Shoubra, Benha University engineers are building a collaborative Online
        Judge System, emphasizing teamwork and skill development. See our{" "}
        <span className="text-main_link_color_dark">privacy policy</span> for
        details.
      </p>
    </div>
  );
}

export default Register;
