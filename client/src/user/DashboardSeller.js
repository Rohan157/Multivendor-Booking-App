import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { sellerHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {
  const [hotels, setHotels] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSellersHotels();
  }, []);
  const loadSellersHotels = async () => {
    let { data } = await sellerHotels(auth.token);
    setHotels(data);
  };

  //here on click we are sending auth.token to our createConnectAccount action
  //which will then send response with token to a URL in our backend
  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res);
      //the below line will get the response from backend which is a link
      //then the href property will redirect us to the link got in response data
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed, Try again");
      setLoading(false);
    }
  };

  const connected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Hotels</h2>
        </div>
        <div className="col-md-2">
          <Link to="/hotels/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>
      <div className="row">
        {hotels.map((h) => (
          <SmallCard k={h._id} h={h} showViewMoreButton={false} owner={true} />
        ))}
      </div>
    </div>
  );
  const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post hotel rooms</h4>
            <p className="lead">
              MERN partners with stripe to transfer earning to your bank account
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted ">
              <small>
                You will be redirected to stripe to complete the onboarding
                process
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
};

export default DashboardSeller;
