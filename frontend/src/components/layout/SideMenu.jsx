import React, { useEffect, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";
import { PiUsers } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../redux/Slice/slice";

const SideMenu = () => {
  const [menuBtn, setMenuBtn] = useState(true);
  const [dropDownTable, setDropDownTable] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null); //2

  const menuToggle = useSelector((state) => state.toggle.toggle);
  const toggleOpenMenu = () => {
    dispatch(setToggle(false));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //sidebar toggle
  const toggleMenu = () => {
    setMenuBtn(!menuBtn);
    setDropDownTable(false);
  };
  //logout function
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  //submenu dropdown

  const tableDropdownMenu = (index) => {
    if (openSubMenuIndex === index) {
      setOpenSubMenuIndex(null);
    } else {
      setOpenSubMenuIndex(index);
    }
  };

  const sideBarMenu = [
    { icon: <MdSpaceDashboard />, label: "Dashboard", link: "/dashboard" },
    {
      icon: <PiUsers />,
      label: "User ",
      link: "/dashboard/users",
    },
    {
      icon: <FaRegUser />,
      label: "Client ",
      link: "/dashboard/clients",
    },
  ];

  return (
    <div className="h-[100vh] sticky top-0 bottom-0 z-[1000]">
      {/* Side menu start */}
      <div
        className={`w-[220px]  sidePmenu bg-black lg:!sticky  z-[1]  lg:left-0 -left-[600px] top-0 h-full absolute  shadow-md transition-all duration-300 ease-in-out ${
          menuBtn
            ? "lg:w-[220px] lg:rounded-tr-[15px] lg:rounded-br-[15px]"
            : "lg:w-[60px] lg:rounded-tr-[0px] lg:rounded-br-[0px]"
        } ${menuToggle ? "left-0" : "-left-[600px]"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col justify-between h-full w-full p-2">
          <ul>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="w-[150px]  overflow-hidden">
                <img
                  src={"/Images/logo.png"}
                  alt="Profile"
                  className="w-full h-full"
                />
              </div>
              <IoIosArrowBack
                className="block lg:hidden"
                onClick={() => toggleOpenMenu()}
              />
            </div>
            <li className="mt-4 mb-5 flex items-center justify-start">
              <div className="gap-1 w-full h-full justify-end items-center lg:flex hidden">
                <ul className="relative ">
                  <li
                    className={`text-[21px] text-white transition-transform duration-300 ease-in-out rounded-full absolute right-[-15px] top-[-10px] bg-black`}
                  >
                    <span
                      className={`tooltip tooltip-right before:text-[10px] ${
                        menuBtn ? "block" : "hidden"
                      }`}
                      data-tip="Shrink"
                    >
                      <IoIosArrowBack
                        className={`rounded-full  ${
                          menuBtn ? "block" : "hidden"
                        } ${isHovered ? "opacity-100" : "opacity-0"}`}
                        onClick={toggleMenu}
                      />
                    </span>
                    <span
                      className={`tooltip tooltip-right before:text-[10px] ${
                        menuBtn ? "hidden" : "block"
                      }`}
                      data-tip="Expand"
                    >
                      <IoIosArrowForward
                        className={`rounded-full ${
                          menuBtn ? "hidden" : "block"
                        } `}
                        onClick={toggleMenu}
                      />
                    </span>
                  </li>
                </ul>
              </div>
            </li>
            <div className=" overflow-y-auto  h-[calc(100vh_-_150px)] ">
              {sideBarMenu.map((item, index) => (
                <div key={index}>
                  <li
                    onClick={
                      item.subMenu
                        ? null
                        : () => dispatch(setNavTitle(item.label))
                    }
                  >
                    <Link
                      to={item.link}
                      className={`sidemenu-links group ${
                        menuBtn ? "justify-between" : "lg:justify-center"
                      }`}
                      onClick={
                        item.subMenu ? () => tableDropdownMenu(index) : null
                      }
                    >
                      <div
                        className={`sidemenu transition-transform duration-300 ease-in-out group-hover:translate-x-2 ${
                          menuBtn
                            ? "lg:group-hover:translate-x-2"
                            : "lg:group-hover:translate-x-0"
                        }`}
                      >
                        <span className="text-[15px]">{item.icon}</span>
                        <p
                          className={`transition-transform duration-300 ${
                            menuBtn ? "block" : "lg:hidden"
                          }`}
                        >
                          {item.label}
                        </p>
                      </div>
                      {item.subMenu && (
                        <SlArrowDown
                          className={`text-[10px] transition-transform duration-300 ease-in-out ${
                            openSubMenuIndex === index
                              ? "rotate-180"
                              : "rotate-0"
                          } ${menuBtn ? "block" : "lg:hidden"}`}
                        />
                      )}
                    </Link>
                  </li>
                  {item.subMenu && (
                    <ul
                      className={`transition-all duration-300 ${
                        openSubMenuIndex === index
                          ? "max-h-screen pl-4"
                          : "max-h-0 overflow-hidden pl-0"
                      } relative after:w-[1px] after:h-[87%] after:bg-slate-500 after:absolute after:left-[10px] after:top-0 before:w-[6px] before:h-[1px] before:bg-slate-500 before:absolute before:bottom-[14px] before:left-[10px]`}
                    >
                      {item.subMenu.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          onClick={() => dispatch(setNavTitle(subItem.label))}
                        >
                          <Link
                            to={subItem.link}
                            className={`sidemenu-links text-[#9d9d9d] group ${
                              menuBtn ? "justify-start" : "lg:justify-center"
                            }`}
                          >
                            <div
                              className={`sidemenu transition-transform duration-300 ease-in-out group-hover:translate-x-2 ${
                                menuBtn
                                  ? "lg:group-hover:translate-x-2"
                                  : "lg:group-hover:translate-x-0"
                              }`}
                            >
                              {subItem.icon}
                              <p
                                className={`transition-transform duration-300 ${
                                  menuBtn ? "block" : "lg:hidden"
                                }`}
                              >
                                {subItem.label}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </ul>
          {/* Side arrow profile, sign out */}
          <ul className="">
            {/* <li
              className={`lg:hidden block  sidemenu-links group ${
                menuBtn ? "justify-start" : "justify-start"
              }`}
            >
              <div
                className={`sidemenu transition-transform duration-300 ease-in-out ${
                  menuBtn ? "translate-x-0" : "translate-x-0"
                }`}
              >
                <FaRegUser className="text-[15px]" />
                <p
                  className={`transition-transform duration-300 ${
                    menuBtn ? "block" : "lg:hidden"
                  }`}
                >
                  Profile
                </p>
              </div>
            </li> */}
            <li
              className={` sidemenu-links group ${
                menuBtn ? "justify-start" : "justify-start"
              }`}
            >
              <div
                className={`sidemenu transition-transform duration-300 ease-in-out group-hover:translate-x-2 ${
                  menuBtn
                    ? "lg:group-hover:translate-x-2"
                    : "lg:group-hover:translate-x-0"
                } `}
              >
                <IoExitOutline className="text-[15px]" />
                <p
                  className={`transition-transform duration-300 cursor-pointer ${
                    menuBtn ? "block" : "lg:hidden"
                  }`}
                  onClick={logout}
                >
                  Sign Out
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Side menu end */}
    </div>
  );
};

export default SideMenu;
