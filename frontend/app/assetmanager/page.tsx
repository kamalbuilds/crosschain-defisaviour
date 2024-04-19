"use client";
import {
    GoldRushProvider,
    NFTWalletTokenListView,
    TokenBalancesListView,
    TokenTransfersListView,
    AddressActivityListView,
} from "@covalenthq/goldrush-kit";
import { useAccountInfo } from "@particle-network/connect-react-ui";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useEffect , useState } from "react";
import { Button } from "@/components/ui/button";

export default function GoldRushExample() {
    const [userEnteredAddress, setUserEnteredAddress] = useState('');
    const { account } = useAccountInfo();
    const [transfers, setTransfers] = useState([]);

    console.log(transfers,"tr",account)

    const fetchTokenTransfers = async () => {
        try {
            const response = await fetch(`/api/tokentransfers?address=${userEnteredAddress}`);
            const data = await response.json();
            setTransfers(data.data); // make sure your API response matches this structure
        } catch (err) {
            console.error('Failed to fetch token transfers:', err);
        }
    };
    


    

    const handleAddressChange = (event : any) => {
        setUserEnteredAddress(event.target.value);
    };

    const effectiveAddress = userEnteredAddress || account;
    const SideNavbarNoSSR = dynamic(() => import('../../components/SideNavbar'), { ssr: false });
    return (
        <div className="flex h-full">
            <SideNavbarNoSSR />
            <div className="flex flex-col gap-4 p-4 w-full">
                <div className="p-4">
                    <Input
                        type="text"
                        placeholder="Enter Address to search"
                        onChange={handleAddressChange}
                        className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <Button onClick={fetchTokenTransfers}>Fetch Token Transfers</Button>
                <ul className="space-y-4">
                    Transfers
                    {transfers?.map((transfer : any, index) => (
                        <li key={index} className="shadow-lg rounded-lg p-4">
                            <div>From: {transfer.from_address}</div>
                            <div>To: {transfer.to_address}</div>
                            <div>Value: {transfer.value}</div>
                            <div>Transaction Hash: {transfer.transaction_hash}</div>
                        </li>
                    ))}
                </ul>
                <div className="space-y-4">
                    <TokenBalancesListView
                        chain_names={["eth-mainnet", "matic-mainnet", "bsc-mainnet", "avalanche-mainnet"]}
                        hide_small_balances
                        address={effectiveAddress}
                        className="shadow-lg rounded-lg p-4"
                    />
                    <TokenTransfersListView
                        chain_name="eth-mainnet"
                        address={effectiveAddress}
                        contract_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                        className="shadow-lg rounded-lg p-4"
                    />
                    <AddressActivityListView
                        address={effectiveAddress}
                        className="shadow-lg rounded-lg p-4"
                    />
                    <NFTWalletTokenListView
                        address={effectiveAddress}
                        chain_names={["eth-mainnet", "matic-mainnet", "bsc-mainnet", "avalanche-mainnet"]}
                        className="shadow-lg rounded-lg p-4"
                    />
                </div>
            </div>
        </div>
    );
}
