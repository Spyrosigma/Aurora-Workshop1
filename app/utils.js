"use client";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "./contractRefs";

export let signer = null;
export let provider;

export async function connectWithMetamask() {
    console.log("calling connect with metamask");
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
        console.log(provider);
    } else {
        provider = await new ethers.BrowserProvider(window.ethereum);
        console.log(provider);
        signer = await provider.getSigner();
        console.log(signer);
        return await provider.send("eth_requestAccounts", [0]);
    }
}
connectWithMetamask();

// Utility to create a new user
export async function createUser(name, favNumber) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)
    const tx = await contract.createUser(name, favNumber)
    console.log("user Create Transaction:", tx)
    return tx

}

// Utility to get a user's details
export async function getUser(userId) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, provider)
    const user = await contract.getUser(userId)
    console.log("user Details:", user)
    return {
        id: user[0].toString(),
        name: user[1],
        favNumber: user[2].toString()
    }
}

// Utility to delete a user
export async function deleteUser() {
    await connectWithMetamask(); 
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)
    const tx = contract.deleteUser(userId)
    console.log("Deleted user Transaction:", tx)
    return tx


}

// Utility to update a user's name and favorite number
export async function updateUser(userId, name, favNumber) {
    await connectWithMetamask(); 
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)
    const tx = await contract.updateUser(userId, name, favNumber)
    console.log("Updated user Transaction:", tx)
    return tx

}



// Utility to get the total number of users
export async function getUserCount() {

}
