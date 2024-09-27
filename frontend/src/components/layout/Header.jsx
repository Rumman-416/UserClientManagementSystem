import React from "react";
import { SlMenu } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { setToggle } from "../../redux/Slice/slice";

const Header = () => {
  const dispatch = useDispatch();
  const toggleOpenMenu = () => {
    dispatch(setToggle(true));
  };

  return (
    <div className=" w-full h-[70px] p-5  drop-shadow-xl">
      <div className=" h-full  ">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-3">
            <SlMenu
              className="text-black lg:hidden block cursor-pointer"
              onClick={() => toggleOpenMenu()}
            />
            {/* <h2 className="lg:block hidden text-black font-medium">title</h2> */}
          </div>
          <div className="flex items-center gap-3 ">
            <ul className="flex items-center gap-2">
              {/* <li className='w-[40px] h-[40px] flex items-center justify-center border rounded-full text-black bg-white'><IoIosNotificationsOutline /></li> */}
              {/* {userData.email} */}
              <li className="w-[40px] h-[40px] flex  border rounded-full overflow-hidden">
                {
                  <img
                    src="/Images/registration/profile.webp"
                    alt="profile"
                    className="w-full"
                  />
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
