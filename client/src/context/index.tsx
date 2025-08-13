// // context/index.tsx
// "use client";

// import React, { useContext, createContext } from "react";
// import {
//   useAddress,
//   useContract,
//   useConnectionStatus,
//   useConnect,
//   useDisconnect,
//   useActiveWalletConnection,
//   useActiveAccount,
// } from "thirdweb/react";

// import { createWallet, walletConnect } from "thirdweb/wallets";
// import { defineChain } from "thirdweb/chains";
// import { ethers } from "ethers";

// // Sesuaikan dengan smart contract kamu
// const CONTRACT_ADDRESS = "0x1E1d8669C5E883F596B1C4D2bE768b8bc5A3E361";

// interface StateContextType {
//   address: string | undefined;
//   contract: any;
//   createCampaign: (form: any) => Promise<void>;
//   connect: () => Promise<void>;
// }

// const StateContext = createContext<StateContextType | undefined>(undefined);

// export const StateContextProvider = ({ children }: { children: React.ReactNode }) => {
//   const connect = useConnect();
//   const address = useAddress();
//   const { contract } = useContract(CONTRACT_ADDRESS);

//   const { mutateAsync: createCampaign } = contract
//     ? contract.useWrite("createCampaign")
//     : { mutateAsync: async () => {} };

//   const publishCampaign = async (form: any) => {
//     try {
//       if (!createCampaign) return;

//       const data = await createCampaign({
//         args: [
//           address,
//           form.title,
//           form.description,
//           form.target,
//           new Date(form.deadline).getTime(),
//           form.image,
//         ],
//       });

//       console.log("✅ success call contract", data);
//     } catch (error) {
//       console.error("❌ error publishing campaign", error);
//     }
//   };

//   const connectWallet = async () => {
//     await connect(async () => createWallet("io.metamask"));
//   };

//   return (
//     <StateContext.Provider
//       value={{
//         address,
//         contract,
//         createCampaign: publishCampaign,
//         connect: connectWallet,
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => {
//   const context = useContext(StateContext);
//   if (!context) {
//     throw new Error("useStateContext must be used inside StateContextProvider");
//   }
//   return context;
// };
