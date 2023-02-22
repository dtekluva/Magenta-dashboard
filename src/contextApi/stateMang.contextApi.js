import axios from "axios";
import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import reducer, { INITIAL_STATE } from "../components/reducer/reducer";
import { onboardingSteps } from "../pages/utils";
const StateMang = createContext();
const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const token = localStorage.getItem("login_token");
  const [passcode, setPassCode] = useState("");
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [autoSweepID, setAutoSweepID] = useState(null);
  const [steps, setSteps] = useState(onboardingSteps);
  const [currentStep, setCurrentStep] = useState(0);
  //sign up flow

  const [value, setValue] = useState("");
  const [showEye, setShowEye] = useState(true);
  const labelRef = useRef(null);
  const inputRef = useRef(null);
  const [userDetails, setUserDetails] = useState({});
  const [passwordDetails, setPasswordDetails] = useState({});
  const [companyDetails, setCompanyDetails] = useState({});
  const [file, setFile] = useState(null);
  const [userMail, setUserMail] = useState({});
  const [userOtp, setUserOtp] = useState({});
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [isAuth, setIsAuth] = useState(false);
  const { branchDetails } = state;
  const [newPassword, setNewPassword] = useState({});
  const [verificationMail, setVerificationMail] = useState("");
  const [states, setStates] = useState({firstAcct:false,secondAcct:false});
  const [user, setUser] = useState({});
  const [showNav, setShowNav] = useState(true);
  const [showCreateBranch, setShowCreateBranch] = useState(false);
  const [showDeleteBranch, setShowDeleteBranch] = useState(false);
  const [showDeletedMsg, setShowDeletedMsg] = useState(false);
  const [showAcctDelete, setShowAcctDelete] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editBranchName, setEditBranchName] = useState("");
  const [editBranchAddress, setEditBranchAddress] = useState("");
  const [editBranchPasscode, setEditBranchPasscode] = useState("");
  const [showEditSucc, setShowEditSucc] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [acctName, setAcctName] = useState("");
  const [acct, setAcct] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showAcctSucc, setShowAcctSucc] = useState(false);
  const [showWithdrawSucc, setShowWithdrawSucc] = useState(false);
  const [showDeleteSucc, setShowDeleteSucc] = useState(false);
  const [otp, setOTP] = useState("");
  const [withdrawOTP, setWithdrawOTP] = useState("");
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showWithdrawOTP, setShowWithdrawOTP] = useState(false);
  const [showWithdrawAmount, setShowWithdrawAmount] = useState(false);
  const [showWithdrawPassword, setShowWithdrawPassword] = useState(false);
  const [showSelectAutoSweep, setShowSelectAutoSweep] = useState(false);
  const [showSelectHourly, setShowSelectHourly] = useState(false);
  const [showSelectDaily, setShowSelectDaily] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [frequency, setFrequency] = useState(false);
  const [freq, setFreq] = useState("");
  const [showAutoSweepAmount, setShowAutoSweepAmount] = useState(false);
  const [showAutoSweepOTP, setShowAutoSweepOTP] = useState(false);
  const [autoSweepOTP, setAutoSweepOTP] = useState("");
  const [autoSweepAmount, setAutoSweepAmount] = useState("");
  const [hour, setHour] = useState("1 hour");
  const [time, setTime] = useState("12:00 am");
  const [setOrResetAutoSweep, setSetOrResetAutoSweep] = useState(false);
  const [resetAutoSweepTime, setResetAutoSweepTime] = useState("");
  const [resetAutoSweepFreq, setResetAutoSweepFreq] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [det, setDel] = useState(null);
 
  let isAuth;
  const handleAutoSweepDelete = async () => {
    const token = localStorage.getItem("login_token");
    const id = localStorage.getItem("key");
    setIsLoading(true);
    try {
      const res = await axios.delete(
        `https://backend.magentacashier.com/business/recurrentcashout/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 204) {
        setIsLoading(false);
        console.log(res);
        localStorage.removeItem("reset_auto_sweep_result");
        localStorage.removeItem("item");
        localStorage.removeItem("key");
        localStorage.removeItem("num");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const data = {
    passcode,
    address,
    name,
  };
  const Get_Branch = async () => {
    try {
      const res = await axios.get(
        "https://backend.magentacashier.com/business/branch/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "Branch Details", payload: res.data });
    } catch (err) {
      if (err?.response?.statusText === "Unauthorized") {
        localStorage.clear();
      }
      console.log(err);
    }
  };





  const Get_Auto_Sweep = async () => {
    const token = localStorage.getItem("login_token");
    try {
      const res = await axios.get(
        "https://backend.magentacashier.com/business/recurrentcashout/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res)
      res?.data?.map((a) => {
        localStorage.setItem("reset_auto_sweep_result", JSON.stringify(a));
        localStorage.setItem("key", JSON.stringify(a?.id));
        localStorage.setItem("item",true)
        localStorage.setItem("num", a.account)
        console.log(a.account)
      });
    } catch (err) {}
  };
 
  const GET_ACCOUNT = async () => {
    const token = localStorage.getItem("login_token");
    try {
      const res = await axios.get(
        "https://backend.magentacashier.com/accounts/account/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: "Account Details", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const label = [
    "Jan",
    "",
    "March",
    "",
    "May",
    "",
    "July",
    "",
    "September",
    "",
    "November",
    "",
  ];
  const option1 = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
      },
    },
  };

  const data1 = {
    labels: label,
    datasets: [
      {
        label: "Sales",
        data: [
          "50",
          "100",
          "150",
          "200",
          "20",
          "50",
          "100",
          "150",
          "200",
          "20",
          "30",
          "13",
        ],
        backgroundColor: "#7132BD",

        cutout: "90%",
        fontFamily: "albert",
        borderRadius: 100,
      },
      {
        label: "Customer",
        data: [
          "50",
          "100",
          "10",
          "100",
          "30",
          "50",
          "100",
          "150",
          "200",
          "20",
          "40",
          "20",
        ],
        backgroundColor: "#D733CE",
        cutout: "90%",
        fontFamily: "albert",
        borderRadius: 100,
      },
    ],
  };
  const option2 = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
  };
  // dashboard customer's chart
  const data2 = {
    labels: ["New Customer", "Old Customer"],
    datasets: [
      {
        label: "# of Votes",
        data: [80, 19],
        backgroundColor: ["#7132BD", "#C302C6"],
        cutout: "80%",
        borderWidth: 1,
        borderRadius: 20,
      },
    ],
  };

  if (localStorage.getItem("isAuth") === null) {
    isAuth = false;
  } else {
    isAuth = true;
  }
  useEffect(() => {
    // if (!localStorage.getItem("isAuth")) {
    //   navigate("/login");
    // }
    Get_Branch();
  }, [branchDetails]);
  const merchant = {
    company_name: companyDetails?.companyName,
    email: userDetails.email,
    phone_number: companyDetails.companyPhone,
    password: passwordDetails.password,
  };
  const client = {
    email: userDetails.email,
    first_name: userDetails.firstname,
    last_name: userDetails.surname,
    password: passwordDetails.password,
    phone_number: companyDetails.companyPhone,
  };

  return (
    <StateMang.Provider
      value={{
        showAcctSucc,
        autoSweepOTP,
        resetAutoSweepFreq,
        setResetAutoSweepFreq,
        resetAutoSweepTime,
        setResetAutoSweepTime,
        GET_ACCOUNT,
        autoSweepID,
        setAutoSweepOTP,
        showAutoSweepOTP,
        freq,
        setFreq,
        setShowAutoSweepOTP,
        autoSweepAmount,
        setAutoSweepAmount,
        showDeleteSucc,
        setShowDeleteSucc,
        showAutoSweepAmount,
        isLoading,
        setIsLoading,
        setShowAutoSweepAmount,
        Get_Auto_Sweep,
        frequency,
        det,
        setDel,
        setFrequency,
        isAuth,
        hour,
        setHour,
        time,
        setTime,
        setOrResetAutoSweep,
        setSetOrResetAutoSweep,
        showWithdrawPassword,
        showSelectHourly,
        setShowSelectHourly,
        showSelectDaily,
        setShowSelectDaily,
        showWithdrawSucc,
        setShowWithdrawSucc,
        showSelectAutoSweep,
        setShowSelectAutoSweep,
        selected,
        setSelected,
        showWithdrawOTP,
        setShowWithdrawOTP,
        setShowWithdrawPassword,
        withdrawOTP,
        selectedOption,
        setSelectedOption,
        setWithdrawOTP,
        showWithdrawAmount,
        setShowWithdrawAmount,
        withdrawPassword,
        states,
        setStates,
        setWithdrawPassword,
        setShowAcctSucc,
        withdrawAmount,
        setWithdrawAmount,
        bankCode,
        setBankCode,
        acctName,
        setAcctName,
        showOTP,
        setShowOTP,
        acct,
        otp,
        setOTP,
        setAcct,
        showAddAccount,
        setShowAddAccount,
        accountNumber,
        setAccountNumber,
        accountName,
        setAccountName,
        showEditSucc,
        setShowEditSucc,
        setEditBranchAddress,
        setEditBranchName,
        setEditBranchPasscode,
        handleAutoSweepDelete,
        editBranchAddress,
        editBranchName,
        editBranchPasscode,
        showEdit,
        setShowEdit,
        state,
        dispatch,
        data1,
        option1,
        data2,
        option2,
        value,
        setValue,
        showEye,
        setShowEye,
        labelRef,
        inputRef,
        userDetails,
        setShowDeleteBranch,
        showDeleteBranch,
        showAcctDelete,
        setShowAcctDelete,
        setUserDetails,
        passwordDetails,
        setPasswordDetails,
        companyDetails,
        setCompanyDetails,
        file,
        setFile,
        steps,
        setSteps,
        currentStep,
        setCurrentStep,
        userMail,
        setUserMail,
        userOtp,
        setUserOtp,
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        showDeletedMsg,
        setShowDeletedMsg,
        newPassword,
        Get_Branch,
        setNewPassword,
        verificationMail,
        setVerificationMail,
        showCreateBranch,
        setShowCreateBranch,
        user,
        setUser,
        client,
        merchant,
        showNav,
        setShowNav,
        passcode,
        setPassCode,
        address,
        setAddress,
        name,
        setName,
      }}
    >
      {children}
    </StateMang.Provider>
  );
};
export default Context;
export const ItemContext = () => {
  return useContext(StateMang);
};
