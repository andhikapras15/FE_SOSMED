import { Link } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useUser from "../../hooks/useUser"; 
import clap from "../../public/clap.gif"

const Verified = (props) => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setstatus] = useState(0);
  const [loading, setloading] = useState(true);
  const { isLogin, username, id, email } = useUser();
  const dispatch = useDispatch();
  // 0 loading 2: gagal 1:berhasil
  useEffect(async () => {
    try {
      let res = await axios.get(`http://localhost:5000/auth/verified`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      //   kalo register langsung login better kriim datanya ke redux
      dispatch({ type: "LOGIN", payload: res.data });
      setstatus(1);
    } catch (error) {
      console.log(error);
      setstatus(2);
    } finally {
      setloading(false);
    }
  }, []);

  const sendEmail = async () => {
    try {
      setloading(true);
      await axios.post(`${API_URL}/auth/sendemail-verified`, {
        id: id,
        username,
      });
      toast.success("berhasil kirim email", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast.error("gagal kirim", {
        position: "top-right",
      });
    } finally {
      setloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div>Loading bro....</div>
      </div>
    );
  }

  if (status === 1) {
    return ( 
      <div className="bg-purple-600 h-screen py-24">
        <div className="flex justify-center items-center">
          <div className="text-2xl text-white mb-6">yeayy you have been successfully verified</div> 
          <img src={"/clap.gif"}/>
        </div>
        <Link href="/login" className="flex justify-center items-center">
          <button className="w-56 h-12 self-center rounded-xl border-0 bg-green-500 text-white text-xl font-medium cursor-pointer">Login Here</button>
        </Link> 
      </div>
    );
  }

  return (
    <div className="bg-purple-600 h-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-white mb-6">Sorry, failed to verified your account</div>
      <div>
        {/* {kalo belum login jangan sediakan button} */}
        {isLogin ? ( 
          <button className="w-64 h-12 self-center rounded-xl border-0 bg-green-500 text-white text-xl font-medium cursor-pointer"onClick={sendEmail}>Send Email Verified Again</button>

        ) : null}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Verified;