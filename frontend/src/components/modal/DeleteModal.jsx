import React from "react";
import { IoClose } from "react-icons/io5";

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  setDeleteInput,
  handleDelete,
}) => {
  if (!showDeleteModal) return null; // Prevents rendering the modal when the state is false
  return (
    <>
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="modal-box relative bg-white p-6 rounded-lg">
          <button
            className="bg-transparent absolute top-0 text-black right-0 p-2 text-lg  rounded bg-white shadow hover:bg-slate-300  "
            onClick={() => setShowDeleteModal(false)}
          >
            <IoClose />
          </button>
          <h3 className="font-semibold text-lg pb-4 text-black border-b">
            Delete Confirmation
          </h3>
          <div className="py-4">
            <label className="text-sm text-black mb-3 block">
              Enter "<b>DELETE</b>" to Successfully Delete the Data {}
            </label>
            <input
              type="text"
              placeholder="DELETE"
              className="py-2 px-3 w-full bg-transparent border border-gray-500 rounded text-gray-600"
              onChange={(e) => setDeleteInput(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="reset"
              className="bg-slate-500  py-2 px-4 text-sm rounded text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" py-2 px-4 text-sm bg-red-600 rounded  text-white"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
