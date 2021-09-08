import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import { toast } from "react-toastify";

//Here history keeps the history of path and we are using it so it can redirect us to login page
const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/register`, {
        name,
        email,
        password,
      });
      console.log("REGISTER USER ===>", res);
      toast("Registeration successful. Please login to your account");
      history.push("/login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
