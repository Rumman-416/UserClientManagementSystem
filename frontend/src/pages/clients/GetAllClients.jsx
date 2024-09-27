import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import axios from "axios";
import { HiOutlinePlus } from "react-icons/hi";
import { BsTrash3 } from "react-icons/bs";
import DeleteModal from "../../components/modal/DeleteModal";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const GetAllClients = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  //delete modal
  const [deleteId, setDeleteId] = useState(null);
  const [deleteInput, setDeleteInput] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/clients`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pan.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUseDelete = (serviceId) => {
    setDeleteId(serviceId);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete = () => {
    if (deleteInput === "DELETE") {
      axios
        .delete(`${apiUrl}/clients/${deleteId}`)
        .then((response) => {
          fetchData();
          console.log("Client deleted:", response.data);
          toast.success("Client deleted successfully");
          fetchData();

          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error("Client deleting Field:", error);
          toast.error("Client deleting Field");
        });
    } else {
      toast.error("Enter DELETE to confirm deletion");
    }
    setDeleteInput("");
    setShowDeleteModal(false);
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

  return (
    <>
      <div className="lg:p-5 p-4 rounded bg-white drop-shadow-xl">
        <div className="flex justify-between items-center pb-4">
          <h2 className="font-medium mb-5 text-black text-lg">Client List</h2>
          <Link to={"/dashboard/add-client"}>
            <div className="p-2 flex gap-2 items-center border rounded text-white bg-mainColor text-sm">
              <HiOutlinePlus />
              Add New Client
            </div>
          </Link>
        </div>
        <div className="lg:py-5 py-4 flex  flex-col justify-between items-center border-b gap-4">
          <div className="flex w-full sm:flex-row flex-col justify-between">
            <div className="flex items-center gap-2 lg:order-1 order-1">
              <p className="text-black text-sm">Show</p>
              <select
                className="select rounded w-full max-w-xs !h-9 min-h-9 bg-white border-[#00000094] !py-0 pl-3 pr-7 focus:border-black focus:outline-none text-black"
                value={showEntries}
                onChange={handleShowEntriesChange}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <p className="text-black text-[14px]">entries</p>
            </div>
            <div className="flex items-center gap-2 lg:order-3 order-2">
              <p className="text-black text-[14px]">Search: </p>
              <input
                id="username"
                name="username"
                type="search"
                autoComplete="username"
                className="block flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-[#00000094] border rounded focus-visible:rounded"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

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
              <th className="font-semibold text-gray-700 uppercase">
                Industry
              </th>
              <th className="font-semibold text-gray-700 uppercase">Action</th>
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
                  <td className="text-[#6d6b77]">{item.industry}</td>
                  <td className=" text-[18px] text-[#6d6b77] h-full">
                    <div className="flex gap-2 items-center">
                      <Link to={`/dashboard/edit-client/${item._id}`}>
                        <GoPencil className=" cursor-pointer" />
                      </Link>
                      <BsTrash3
                        className=" cursor-pointer"
                        onClick={() => {
                          handleUseDelete(item._id);
                        }}
                      />
                    </div>
                  </td>
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

        <div className="flex justify-between items-center py-2">
          <p className="text-sm">
            Showing {startIndex + 1} to {endIndex} of {filteredData.length}{" "}
            entries
          </p>
          <div className="flex items-center gap-1 text-sm">
            <button
              className="bg-[#8692d014] rounded text-gray-500 hover:bg-gray-100 py-2 px-3 cursor-pointer"
              disabled={currentPage === 1}
              onClick={() => handlePagination(currentPage - 1)}
            >
              Previous
            </button>
            <p className="py-2 px-4 bg-mainColor text-white rounded">
              {currentPage}
            </p>
            <button
              className="bg-[#8692d014] rounded text-gray-500 hover:bg-gray-100 py-2 px-3 cursor-pointer"
              disabled={
                currentPage === Math.ceil(filteredData.length / showEntries)
              }
              onClick={() => handlePagination(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        setDeleteInput={setDeleteInput}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default GetAllClients;
