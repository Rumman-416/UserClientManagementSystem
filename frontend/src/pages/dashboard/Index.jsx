import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { PrintComponent, useReactToPrint } from 'react-to-print';
ChartJS.register(ArcElement, Tooltip, Legend);

const apiUrl = import.meta.env.VITE_API_URL;

const Index = () => {
  const componentPDF = useRef()
  const tableRef = React.createRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState([]);
  const [counts, setCounts] = useState({
    messageCounts: [],
    successCounts: [],
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/reports`)
      .then((response) => {
        const responseData = response.data.data;
        setData(responseData);

        const groupedData = responseData.reduce((acc, current) => {
          const message = current.message;
          if (!acc[message]) {
            acc[message] = [];
          }
          acc[message].push(current);
          return acc;
        }, {});

        const messageCounts = Object.keys(groupedData).map((message) => ({
          message,
          count: groupedData[message].length,
        }));

        const successCounts = [
          {
            success: true,
            count: responseData.filter((item) => item.success).length,
          },
          {
            success: false,
            count: responseData.filter((item) => !item.success).length,
          },
        ];

        setCounts({
          messageCounts,
          successCounts,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch data.");
      });
  }, []);

  // Prepare data for success pie chart
  const successPieData = {
    labels: counts.successCounts.map((item) =>
      item.success ? "Success" : "Failure"
    ),
    datasets: [
      {
        data: counts.successCounts.map((item) => item.count),
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  // Prepare data for message pie chart
  const messagePieData = {
    labels: counts.messageCounts.map((item) => item.message),
    datasets: [
      {
        data: counts.messageCounts.map((item) => item.count),
        backgroundColor: ["#FFCE56", "#4BC0C0", "#9966FF", "#FF6384"],
      },
    ],
  };

  const filteredData = data.filter((item) => {
    return item.message.toLowerCase().includes(searchQuery.toLowerCase());
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

  const generatePDF=useReactToPrint({
    content: ()=>componentPDF.current,
    documentTitle:"MIS Report",
    onAfterPrint:()=>toast.success("Report saved in pdf")
  })
  return (
    <>
      <div className="flex justify-center items-start gap-5 flex-col md:flex-row">
        <div className="flex flex-col w-[45%] mt-4 rounded bg-whit drop-shadow-xl h-[350px] p-4">
          <label className="text-center">Message Distribution</label>
          <div className="w-64 h-64 mx-auto">
            <Pie data={messagePieData} />
          </div>
        </div>
        <div className="flex flex-col w-[45%] rounded bg-whit drop-shadow-xl h-[350px] p-4">
          <label className="text-center">Success Counts</label>
          <div className="w-64 h-64 mx-auto">
            <Pie data={successPieData} />
          </div>
        </div>
      </div>
      <div className="lg:p-5 p-4 rounded bg-white drop-shadow-xl">
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
               <button
            className="bg-blue-500 text-white rounded px-4 py-2"
            onClick={generatePDF}
          >
            Export to PDF
          </button>
            </div>
          </div>
        </div>
<div ref={componentPDF}>
        <table className="table border w-full  overflow-x-auto">
          <thead>
            <tr className="border-slate-200 bg-[#c7e8f5]">
              <th className="font-semibold text-gray-700 uppercase">no.</th>
              <th className="font-semibold text-gray-700 uppercase">Status</th>
              <th className="font-semibold text-gray-700 uppercase">message</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index} className="border-slate-200">
                  <td className="text-[#6d6b77]">{index + 1}</td>
                  <td className="text-[#6d6b77]">
                    {item.success ? "Success" : "Falied"}
                  </td>
                  <td className="text-[#6d6b77]">{item.message}</td>
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
        </div>
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
    </>
  );
};

export default Index;
