import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Component/Layout/Loading";
import "./Register.css";
import img2 from '../Images/sign-up-concept-illustration_114360-7965.avif'

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const res=await axios.post("/api/v1/users/register", values);
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong" + error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="main_container2">
      {loading && (
          
          <div className="loading-container">
            <Loading />
          </div>
        )}
        <div className="reg_container">

          <div>
            <h1>Register</h1>
          </div>
        <div className="register">
          <div className="img_reg">
           <img className="img2" src={img2} alt="signup"/>
          </div>

          <div className="form_reg">
            <div className="form_main">
            <Form layout="vertical" onFinish={submitHandler}>
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="E-mail" name="email">
                <Input type="email" required />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" required />
              </Form.Item>
              <div className="register_main">
                <Link to={"/login"}>Already a user ? <span className="span_data">Log in</span></Link>
                <button className="reg_btn">Register</button>
              </div>
            </Form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
