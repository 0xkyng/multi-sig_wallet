import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
require("dotenv").config;

const { SEPOLIARPC, PRIVATEKEY1, PRIVATEKEY2, PRIVATEKEY3 } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.SEPOLIARPC,
      accounts: [PRIVATEKEY1!, PRIVATEKEY2!, PRIVATEKEY3!, ],
    },
  },
};

export default config;
