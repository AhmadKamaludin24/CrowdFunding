import React, { useEffect } from "react";
import { useReadContract } from "thirdweb/react";
import { contract } from "../client";
import DisplayFund from "../components/DisplayFund";
import { ethers } from "ethers";
import { watchContractEvents } from "thirdweb";

const Home = () => {
    const { data, isPending, refetch } = useReadContract({
        contract: contract,
        method: "function getCampaign() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountColected, string image, address[] donators, uint256[] donations)[])",
        params: [],
    });

    useEffect(() => {
        const unwatch = watchContractEvents({
            contract: contract,
            onEvents: (events) => {
                // The onEvents callback will be called whenever an event is emitted from the contract
                console.log("Contract event received, refetching data...", events);
                refetch();
            },
        });

        // The returned function from useEffect will be called when the component unmounts
        // This is important to clean up the event listener
        return () => unwatch();
    }, [refetch]);

    const campaigns =
        data?.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            deadline: Number(campaign.deadline),
            target: ethers.utils.formatEther(campaign.target.toString()),
            amountColected: ethers.utils.formatEther(campaign.amountColected.toString()),
            image: campaign.image,
            donators: campaign.donators.length,
            pid: i,
        })) || [];

    console.log(campaigns);

    return <DisplayFund isLoading={isPending} campaign={campaigns} />;
};

export default Home;