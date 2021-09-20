import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe";
import { LoadingOutlined } from "@ant-design/icons";

const StripeSuccess = ({ match, history }) => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    // console.log(
    //   "send this hotelId to backend to create order",
    //   match.params.hotelId
    // );
    stripeSuccessRequest(token, match.params.hotelId).then((res) => {
      if (res.data.success) {
        // console.log("stripe success response", res.data);
        history.push("/dashboard");
      } else {
        history.push("/stripe/cancel");
      }
    });
  }, [match.params.hotelId]);
  return (
    <div className="container">
      <div className="col text-center mt-5 p-5">
        <h1 className="text-info"> Payment Successful </h1>
        <LoadingOutlined className="display-1 text-success p-5" />
      </div>
    </div>
  );
};

export default StripeSuccess;
