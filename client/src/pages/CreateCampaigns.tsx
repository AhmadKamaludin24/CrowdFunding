import React, { useEffect, useState } from "react";
import FormField from "../components/FormField";
import { createCampaign, money } from "../assets";
import CustomButton from "../components/CustomButton";
import { client } from "../client";
import { checkIfImage } from "../../utils";
import {
  useActiveAccount,
  useConnect,
  useSendTransaction,
} from "thirdweb/react";
import {
  createThirdwebClient,
  defineChain,
  getContract,
  prepareContractCall,
} from "thirdweb";
import { parseEther } from "ethers/lib/utils";

import { contract } from "../client";
import { toast } from "sonner";
import { createWallet } from "thirdweb/wallets";

const CreateCampaigns = () => {
  const [isLoading, setisLoading] = useState(false);
  const owner = useActiveAccount();
  const { connect, isConnecting, error } = useConnect();
  const {
    mutate: sendTransaction,
    isPending,
    isPaused,
    isSuccess,
  } = useSendTransaction();

  const [form, setform] = useState({
    name: "",
    title: "",
    description: "",
    image: "",
    deadline: "",
    target: "",
  });

  const handleField = (fieldName: string, e: any) => {
    setform({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const exist = await new Promise<boolean>((resolve) => {
        checkIfImage(form.image, (exist: boolean) => resolve(exist));
      });

      if (!exist) {
        alert("invalid image");
        return;
      }

      const transaction = prepareContractCall({
        contract,
        method:
          "function createCampaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image) returns (uint256)",
        params: [
          owner?.address ?? "",
          form.title,
          form.description,
          form.target ? parseEther(form.target).toBigInt() : BigInt(0),
          form.deadline ? BigInt(new Date(form.deadline).getTime()) : BigInt(0),
          form.image,
        ],
      });
      setisLoading(true);
      await sendTransaction(transaction); // tunggu selesai
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    const toastId = "loading-toast"; // ID unik

    if (isLoading || isPending) {
      toast.loading("loading Metamask..", { id: toastId });
    } else {
      toast.dismiss(toastId);
    }

    if (isPaused) {
      toast.dismiss(toastId);
    }

    if (isSuccess) {
      toast.success("success", { id: "success-toast" });
    }
  }, [isLoading, isPaused, isSuccess, isPending]);

  return (
    <div className="flex flex-col justify-center container mx-auto items-center p-4 sm:p-10 bg-[#1c1c24] rounded-xl">
      {isLoading ||
        (isPending && (
          <div className="absolute inset-0 backdrop-blur-2xl z-50"></div>
        ))}

      <div className="bg-gray-600 rounded-lg sm:min-w-[480px] w-full flex justify-center items-center p-7 max-sm:p-2">
        <h1 className="font-bold text-2xl">Start a Campaign</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-12 w-full flex flex-col gap-4"
      >
        <div className="flex flex-wrap gap-10">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e: any) => handleField("name", e)}
          />
          <FormField
            labelName="Title *"
            placeholder="Campaign titile"
            inputType="text"
            value={form.title}
            handleChange={(e: any) => handleField("title", e)}
          />
        </div>
        <FormField
          labelName="story *"
          placeholder="write your story here"
          value={form.description}
          isTextArea={true}
          handleChange={(e: any) => handleField("description", e)}
        />

        <div className="w-full p-4 bg-purple-500 rounded-xl flex justify-start items-center">
          <img src={money} alt="money" className="w-10 object-contain" />
          <h4 className="font-bold text-2xl text-white ml-4">
            You Will Get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-10">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e: any) => handleField("target", e)}
          />
          <FormField
            labelName="End date *"
            placeholder=""
            inputType="date"
            value={form.deadline}
            handleChange={(e: any) => handleField("deadline", e)}
          />
        </div>
        <FormField
          labelName="Campaign Image link *"
          placeholder="https://.."
          inputType="text"
          value={form.image}
          handleChange={(e: any) => handleField("image", e)}
        />
        <div className="w-full flex justify-center items-center">
          <CustomButton
            isLoading={isLoading}
            btnType="submit"
            title={isLoading ? "loading" : "Create Campaign"}
            styles="bg-[#4acd8d] p-2 w-full"
            handleClick={() => {
              if (!owner) {
                connect(async () => {
                  // create a wallet instance
                  const metamask = createWallet("io.metamask"); // autocomplete the wallet id
                  // trigger the connection
                  await metamask.connect({ client });
                  // return the wallet
                  return metamask;
                });
              }
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaigns;
