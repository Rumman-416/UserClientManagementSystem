import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";

const apiUrl = import.meta.env.VITE_API_URL;
const panUrl = import.meta.env.VITE_API_PAN_URL;

const AddUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    if (!data.name) {
      return toast.warning("Please enter user name");
    } else if (!data.email) {
      return toast.warning("Please enter user email");
    } else if (!data.phone) {
      return toast.warning("Please enter user phone number");
    } else if (!data.pan) {
      return toast.warning("Please enter user pan number");
    }
    const formData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      pan: data.pan,
    };
    const panData = {
      pan: data.pan,
    };

    axios
      .post(`${panUrl}/api/validate-pan`, panData)
      .then((res) => {
        if (res.status === 200) {
          const report = {
            success: true,
            message: res.data.msg,
          };
          axios
            .post(`${apiUrl}/reports`, report)
            .then(() => {
              axios
                .post(`${apiUrl}/users/`, formData)
                .then((response) => {
                  if (response.status === 201) {
                    toast.success("User has been added successfully");
                    navigate("/dashboard/users");
                  } else {
                    toast.error("Failed to add user");
                  }
                })
                .catch((error) => {
                  console.error(error);
                  toast.error(error.response.data.message);
                });
            })
            .catch((error) => {
              console.error(error);
              toast.error(error.response.data.message);
            });
        } else {
          toast.error(res.data.message);
          const report = {
            success: false,
            message: res.data.message,
          };
          axios.post(`${apiUrl}/reports`, report);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        const report = {
          success: false,
          message: err.response.data.message,
        };
        axios.post(`${apiUrl}/reports`, report);
      });
  };

  const handleCancel = () => {
    setData({
      name: "",
      email: "",
      phone: "",
      pan: "",
    });
  };
  return (
    <div>
      <div className="rounded bg-white drop-shadow-xl mb-4">
        <div className="lg:p-5 p-4">
          <div className="flex justify-between">
            <h3 className="font-medium mb-5 text-black text-lg">Add User</h3>
            <Link to={"/dashboard/users"}>
              <div className="p-2 flex gap-2 items-center border rounded text-white bg-mainColor text-sm">
                <RxHamburgerMenu />
                Show Users
              </div>
            </Link>
          </div>
          <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div>
              <label>
                Name:<span className="text-[#ff1d1d] ">*</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter name"
                value={data.name}
                onChange={handleInputChange}
                className="bg-white w-full border-gray-400 border py-[8px] px-3 rounded text-gray-500 focus-visible:border-gray-400 focus-visible:outline-none lg:w-full text-sm"
              />
            </div>
            <div>
              <label>
                Email:<span className="text-[#ff1d1d] ">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                value={data.email}
                onChange={handleInputChange}
                className="bg-white w-full border-gray-400 border py-[8px] px-3 rounded text-gray-500 focus-visible:border-gray-400 focus-visible:outline-none lg:w-full text-sm"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div>
              <label>
                Phone number:<span className="text-[#ff1d1d] ">*</span>
              </label>
              <input
                name="phone"
                type="number"
                placeholder="Enter phone number"
                value={data.phone}
                onChange={handleInputChange}
                className="bg-white w-full border-gray-400 border py-[8px] px-3 rounded text-gray-500 focus-visible:border-gray-400 focus-visible:outline-none lg:w-full text-sm"
              />
            </div>
            <div>
              <label>
                Pan:<span className="text-[#ff1d1d] ">*</span>
              </label>
              <input
                name="pan"
                type="text"
                placeholder="Enter pan number"
                value={data.pan}
                onChange={handleInputChange}
                className="bg-white w-full border-gray-400 border py-[8px] px-3 rounded text-gray-500 focus-visible:border-gray-400 focus-visible:outline-none lg:w-full text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="py-2 px-3 rounded bg-mainColor text-white text-sm hover:text-white transition-all hover:bg-[#8bd2f0]"
            >
              Submit
            </button>
            <button
              type="button"
              className="py-2 px-3 rounded bg-gray-100 text-gray-400 text-sm hover:text-gray-500 transition-all hover:bg-gray-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
