import React, { useEffect, useState } from "react";
import { HiOutlineCash, HiOutlineChartSquareBar } from "react-icons/hi";
import { BsWallet2 } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { ItemContext } from "../../../contextApi/stateMang.contextApi";
import { NumericFormat } from "react-number-format";
import axios from "axios";
const DashboardCol1 = () => {
  const { transaction, GET_MERCHANT_TRANSACTION } = ItemContext();
  useEffect(() => {
    GET_MERCHANT_TRANSACTION();
  }, []);
  // const GET_MERCHANT_TRANSACTION = async () => {

  //   const token = localStorage.getItem("login_token");
  //   try {
  //     const res = await axios.get(
  //       "https://backend.magentacashier.com/business/merchant-transaction-total/",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(res)
  //     if (res.status === 200)  setTransaction(res.data);
  //     console.log(res);

  //     console.log(transaction);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const numFormatter=require('number_formatter')
  const all_time_sales = transaction?.all_time_sales;
  const available_cash = transaction?.available_cash;
  const today_sale = transaction?.today_sales;

  const month = new Date().getMonth() + 1;
  // const [month,setMonth]=useState("")
  const getMonth = (month) => {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        console.log("first");
    }
  };
  return (
    <div className="flex flex-col w-full gap-4 mb-10">
      <div className="flex mt-6 justify-between">
        <h1 className="font-medium text-2xl albert">Dashboard</h1>
        <div>
          <div className="bg-[#EEE8F8] w-full text-black text-[12px] flex gap-2 font-medium border-rounded rounded-xl p-2 ">
            <div>
              <svg
                width="30"
                height="25"
                viewBox="0 0 50 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.42"
                  width="50"
                  height="45"
                  rx="10"
                  fill="#C7AFE4"
                />
                <path
                  d="M22.4791 21.8667H18.9458C18.1058 21.8667 17.4258 22.5466 17.4258 23.3866V30.2133H22.4791V21.8667V21.8667Z"
                  stroke="#4E00AD"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26.0154 15.8H23.9887C23.1487 15.8 22.4688 16.4801 22.4688 17.3201V30.2001H27.5221V17.3201C27.5221 16.4801 26.8554 15.8 26.0154 15.8Z"
                  stroke="#4E00AD"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M31.0646 24.1333H27.5312V30.2H32.5846V25.6533C32.5713 24.8133 31.8912 24.1333 31.0646 24.1333Z"
                  stroke="#4E00AD"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.0013 36.3334H29.0013C35.668 36.3334 38.3346 33.6667 38.3346 27.0001V19.0001C38.3346 12.3334 35.668 9.66675 29.0013 9.66675H21.0013C14.3346 9.66675 11.668 12.3334 11.668 19.0001V27.0001C11.668 33.6667 14.3346 36.3334 21.0013 36.3334Z"
                  stroke="#4E00AD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="m-1 albert font-bold text-sm">
              {getMonth(month)} {new Date().getDate()},{" "}
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-6 justify-between">
        <div className="w-80 h-fit border flex gap-6 rounded-lg px-6 py-4">
          <div className="bg-[#C7AFE4] w-10 h-8 flex justify-center items-center rounded-lg">
            <HiOutlineCash size="25px" className="text-[#4E00AD]" />
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="albert">All Time Cash</h4>
            <h2 className="font-bold flex items-center inter text-[24px]">
              <TbCurrencyNaira />
              <NumericFormat
                value={all_time_sales ? all_time_sales : 0}
                thousandsGroupStyle="lakh"
                thousandSeparator=","
                displayType="text"
                renderText={(value) => <b>{value}</b>}
              />
            </h2>
          </div>
        </div>
        <div className="w-80 h-fit border flex gap-6 rounded-lg px-6 py-4">
          <div className="bg-[#C7AFE4] w-10 h-8 flex justify-center items-center rounded-lg">
            <BsWallet2 size="20px" className="text-[#4E00AD]" />
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="albert">Available Cash</h4>
            <h2 className="inter text-[24px] font-bold flex items-center">
              <TbCurrencyNaira />
              <NumericFormat
                value={available_cash ? available_cash : 0}
                thousandsGroupStyle="lakh"
                thousandSeparator=","
                displayType="text"
                renderText={(value) => (
                  <b>{value.includes("-") ? "0" : value}</b>
                )}
              />
            </h2>
          </div>
        </div>
        <div className="w-80 h-fit border flex gap-6 rounded-lg px-6 py-4">
          <div className="bg-[#C7AFE4] w-10 h-8 flex justify-center items-center rounded-lg">
            <HiOutlineChartSquareBar size="20px" className="text-[#4E00AD]" />
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="albert">Today Sales</h4>
            <h2 className="inter text-[24px] font-bold flex items-center">
              <TbCurrencyNaira />
              <NumericFormat
                value={today_sale ? today_sale : 0}
                // thousandsGroupStyle="lakh"
                thousandSeparator=","
                displayType="text"
                renderText={(value) => <b>{value}</b>}
              />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCol1;
