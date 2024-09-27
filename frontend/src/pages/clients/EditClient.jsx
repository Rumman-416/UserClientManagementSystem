import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";

const apiUrl = import.meta.env.VITE_API_URL;
const panUrl = import.meta.env.VITE_API_PAN_URL;

const EditClient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
    city: "",
    industry: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const dropdownRefField = useRef(null);
  const [fieldName, setFieldName] = useState([]);
  const [fields, setFields] = useState([]);
  const [fieldId, setFieldId] = useState([]);
  const [isFieldOpen, setIsFieldOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/clients/${id}`)
      .then((response) => {
        setData(response.data.data);
        const filteredField = response.data.data.user.map((field) => field);
        axios
          .get(`${apiUrl}/users`)
          .then((response) => {
            console.log(response.data);
            setFieldName(response.data.data);
            const filteredFields = response.data.data.filter((field) =>
              filteredField.includes(field._id)
            );
            setFields(filteredFields);
            console.log(filteredFields);
            console.log(filteredField);
          })
          .catch((error) => {
            console.log("error", error);
          });
        setFieldId(filteredField);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleOptionClickField = (option) => {
    const fieldExists = fields.some((doc) => doc._id === option._id);

    if (fieldExists) {
      setFields(fields.filter((doc) => doc._id !== option._id));
    } else {
      setFields([...fields, option]);
    }
  };
  const handleClickOutsideField = (event) => {
    if (
      dropdownRefField.current &&
      !dropdownRefField.current.contains(event.target)
    ) {
      setIsFieldOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideField);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideField);
    };
  }, []);

  //
  const filteredData = fields.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pan.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleShowEntriesChange = (e) => {
    setShowEntries(parseInt(e.target.value, 10));
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const paginatedData = filteredData.slice(startIndex, endIndex);

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
      city: data.city,
      industry: data.industry,
      user: fields.map((item) => item._id),
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
                .put(`${apiUrl}/clients/${id}`, formData)
                .then((response) => {
                  if (response.status === 200) {
                    toast.success("Client has been updated successfully");
                    navigate("/dashboard/clients");
                  } else {
                    toast.error("Failed to update user");
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
      city: "",
      industry: "",
    });
    setFields([]);
  };

  return (
    <div>
      <div className="rounded bg-white drop-shadow-xl mb-4">
        <div className="lg:p-5 p-4">
          <div className="flex justify-between">
            <h3 className="font-medium mb-5 text-black text-lg">
              Edit Clients
            </h3>
            <Link to={"/dashboard/clients"}>
              <div className="p-2 flex gap-2 items-center border rounded text-white bg-mainColor text-sm">
                <RxHamburgerMenu />
                Show Clients
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
          <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div>
              <label>
                City:<span className="text-[#ff1d1d] ">*</span>
              </label>
              <input
                name="city"
                type="text"
                placeholder="Enter city name "
                value={data.city}
                onChange={handleInputChange}
                className="bg-white w-full border-gray-400 border py-[8px] px-3 rounded text-gray-500 focus-visible:border-gray-400 focus-visible:outline-none lg:w-full text-sm"
              />
            </div>
            <div>
              <label>
                Industry:<span className="text-[#ff1d1d] ">*</span>
              </label>
              <input
                name="industry"
                type="text"
                placeholder="Enter industry name "
                value={data.industry}
                onChange={handleInputChange}
                className="bg-white w-full border-gray-400 border py-[8px] px-3 rounded text-gray-500 focus-visible:border-gray-400 focus-visible:outline-none lg:w-full text-sm"
              />
            </div>
          </div>
          <div className="relative w-full " ref={dropdownRefField}>
            <label>Users:</label>
            <button
              type="button"
              className="select select-bordered w-full bg-white border border-gray-400 focus:outline-none focus:border-gray-400 text-gray-500 h-[2.4rem] min-h-[2.4rem]  rounded flex items-center justify-between"
              onClick={() => setIsFieldOpen(!isFieldOpen)}
            >
              {fields.length > 0 ? (
                <div className="flex flex-wrap max-w-full overflow-x-auto min-h-8 overflow-y-hidden">
                  {fields.map((item, index) => (
                    <div
                      key={index}
                      className="m-1 px-1 rounded-sm bg-mainColor text-white"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              ) : (
                <p> Please select users associated with client </p>
              )}
            </button>
            {isFieldOpen && (
              <div className="absolute z-10 w-full bg-white border border-gray-400 rounded mt-1 p-1 max-h-48 overflow-y-auto">
                {fieldName.map((option, index) => {
                  const isSelected = fields.some(
                    (doc) => doc._id === option._id
                  );
                  return (
                    <div
                      key={index}
                      className={`cursor-pointer px-4 py-2 mb-1 rounded text-sm ${
                        isSelected
                          ? "bg-mainColor text-white"
                          : "text-gray-500 hover:bg-mainColor hover:text-white"
                      }`}
                      onClick={() => handleOptionClickField(option)}
                    >
                      {option.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className=" px-5 pb-5">
          <table className="table border w-full  overflow-x-auto">
            <thead>
              <tr className="border-slate-200 bg-[#c7e8f5]">
                <th className="font-semibold text-gray-700 uppercase">no.</th>
                <th className="font-semibold text-gray-700 uppercase">Name</th>
                <th className="font-semibold text-gray-700 uppercase">Email</th>
                <th className="font-semibold text-gray-700 uppercase">Phone</th>
                <th className="font-semibold text-gray-700 uppercase">
                  PAN Number
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index} className="border-slate-200">
                    <td className="text-[#6d6b77]">{index + 1}</td>
                    <td className="text-[#6d6b77]">{item.name}</td>
                    <td className="text-[#6d6b77]">{item.email}</td>
                    <td className="text-[#6d6b77]">{item.phone}</td>
                    <td className="text-[#6d6b77]">{item.pan}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default EditClient;
