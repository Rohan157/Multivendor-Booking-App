import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import Meta from "antd/lib/card/Meta";
import { getAccountBalance, payoutSetting } from "../actions/stripe";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
// import { currencyFormatter } from "../actions/stripe";
const { Ribbon } = Badge;

const ConnectNav = () => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      // console.log(res);
      setBalance(res.data);
    });
  }, []);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(auth.token);
      // console.log("RESPONSE FOR PAYOUT SETTING LINK", res);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("unable to access settings");
    }
  };

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            {/* Here I have made some changes becasue I made changes in db that are not according to tutorial */}
            <Ribbon text="Avaliable" color="darkgreen">
              <Card className="bg-light pt-1">
                <span className="lead">PKR Rs.{balance}</span>
              </Card>
            </Ribbon>

            <Ribbon text="Payouts" color="darkgreen">
              <Card onClick={handlePayoutSettings} className="bg-light pointer">
                <SettingOutlined className="h4 pt-2" />
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
