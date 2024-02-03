import React from "react";
import UserInfoBox from "../modules/UI/UserInfoBox";
import WalletInfo from "../modules/UI/WalletInfo";
import UpdateAddress from "../modules/Service/UpdateAddress";

const Home = () => {
  return (
    <div>
      <UserInfoBox />
        <WalletInfo />
    </div>
  );
};

export default Home;
