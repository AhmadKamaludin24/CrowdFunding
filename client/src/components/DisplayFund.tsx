import React from "react";
import FundCard from "./FundCard";
import { useNavigate } from "react-router-dom";

const DisplayFund = ({
  campaign,
  isLoading,
}: {
  campaign: any;
  isLoading: boolean;
}) => {
  console.log(campaign);
  const navigate = useNavigate()
  const handleNavigate =  (campaign:any) => {
    navigate(`/campaign-details/${campaign.title}`, {state: campaign})
  }
  return (
    <div className="mt-5">
      <h1 className="text-2xl">All Campaigns({campaign.length}) </h1>
      {isLoading && <div>loading</div>}
      {campaign.length > 0 && (
        <div className="flex flex-wrap gap-6 mt-3">
          {campaign.map((item: any) => (
            <FundCard
              key={item.pid}
              amountColected={item.amountColected}
              deadline={item.deadline}
              description={item.description}
              image={item.image}
              owner={item.owner}
              target={item.target}
              donators={item.donators}
              title={item.title}
              handleClick={()=>handleNavigate(item)}

            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayFund;
