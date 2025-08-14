import { useLocation, useParams } from "react-router-dom";
import { daysLeft } from "../../utils";
import StatsCard from "../components/StatsCard";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import React, { useEffect, useState } from "react";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { contract } from "../client";
import { toast } from "sonner";
import { ethers } from "ethers";

const CampaignDetail = () => {
  const { state } = useLocation();
  const [amount, setAmount] = useState("");
  const {
    mutate: sendTransaction,
    isPending,
    isSuccess,
    isPaused,
    isError,
    status,
  } = useSendTransaction();
  const campaign = state;

  const { data: campaigns, isPending: isCampaignPending } = useReadContract({
    contract,
    method:
      "function campaigns(uint256) view returns (address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountColected, string image)",
    params: [campaign.pid],
  });

  const { data, isPending: isDonatorPending } = useReadContract({
    contract,
    method:
      "function getDonators(uint256 _id) view returns (address[], uint256[])",
    params: [campaign.pid],
  });
  const [addresses, values] = (data || [[], []]) as [string[], bigint[]];

  const handleSubmit = (e: React.FormEvent) => {
    console.log(amount);
    e.preventDefault();
    const transaction = prepareContractCall({
      contract,
      method: "function donateToCampaign(uint256 _id) payable",
      params: [campaign.pid],
      value: toWei(amount),
    });
    sendTransaction(transaction);
  };

  useEffect(() => {
    const toastId = "loading-toast"; // ID unik

    if (isPending) {
      toast.loading("loading Metamask..", { id: toastId });
    } else {
      toast.dismiss(toastId);
    }

    if (isPaused) {
      toast.dismiss(toastId);
    }

    if (status === "success") {
      toast.success("success", { id: "success-toast" });
    }

    if (isError) {
      toast.error("something wrong", { id: "error-toast" });
    }
  }, [isPaused, isPending, isError, status]);

  return (
    <div className="flex-col container mx-auto gap-4">
      {isPending && (
        <div className="absolute inset-0 z-50 backdrop-blur-2xl"></div>
      )}
      <div className="flex flex-row max-md:flex-col w-full h-[460px]">
        <img
          src={!isCampaignPending ? campaigns?.[6] : undefined}
          alt="campaign-image"
          className="object-cover rounded-xl  w-[80%] max-md:w-full"
        />
        <div className="flex flex-col max-md:flex-row max-md:w-full sm:gap-2 max-md:items-center justify-around items-end w-[20%] h-full">
          <StatsCard
            title={
              !isCampaignPending && campaigns?.[5] !== undefined
                ? `${ethers.utils.formatEther(campaigns[5].toString())} ETH`
                : undefined
            }
            subTitle={`raised of ${campaign.target}`}
          />
          <StatsCard title={daysLeft(campaign.deadline)} subTitle="days left" />
          <StatsCard title={campaign.donators} subTitle="donators" />
        </div>
      </div>

      <div className="flex w-full gap-4 sm:mt-7 justify-between max-md:flex-col ">
        <div className="flex flex-col sm:w-[40%]">
          <h1 className="text-2xl font-bold">Creator:</h1>
          <div className="flex items-center  gap-3 my-5">
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${campaign.owner}`}
              alt="creator-avatar"
              className="w-12 rounded-full"
            />
            <p className="font-semibold max-md:text-sm">{campaign.owner}</p>
          </div>
          <h1 className="text-2xl font-bold">Story:</h1>
          <p className="text-gray-400 sm:max-w-[800px]">
            {campaign.description}
          </p>
        </div>

        <div className="sm:w-[30%]">
          
          <h3 className="mb-3 text-2xl">Donators:</h3>
          <div className="w-full h-56 overflow-y-auto bg-[#1c1c24] rounded-lg p-4">
            {addresses.length <= 0 && <div className="flex justify-center items-center h-full">Donators not Found</div>}
            {!isDonatorPending &&
              addresses.map((address, index) => (
                <div
                  key={address}
                  className="flex justify-between text-sm gap-2 text-gray-300 py-1"
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address}`}
                      alt="creator-avatar"
                      className="w-7 rounded-full"
                    />
                    <div className="flex flex-col justify-center">
                      <span>{address}</span>
                      <span className="truncate max-sm:text-sm text-[10px]">
                        {ethers.utils.formatEther(values[index])} ETH
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col h-72 sm:w-[30%]">
          <h1 className="font-bold text-2xl">FUND</h1>
          <div className="p-4 w-full bg-[#1c1c24] rounded-xl h-56 mt-4">
            <h1 className="text-gray-400 text-center text-xl mb-4">
              Pledge without reward
            </h1>
            <form onSubmit={handleSubmit} className="gap-3 flex flex-col">
              <FormField
                placeholder="ETH 0.1"
                inputType="number"
                value={amount}
                handleChange={(e: any) => setAmount(e.target.value)}
              />
              <button
                type="submit"
                className="w-full py-4 bg-violet-500 rounded-xl mt-4 font-bold"
              >
                FUND
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
