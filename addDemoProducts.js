const ethers = require("ethers");
require("dotenv").config();
const abi = require("./CrowdFundingABI.json");

// ====== CONFIGURATION ======
const CONTRACT_ADDRESS = "0xf59A1f8251864e1c5a6bD64020e3569be27e6AA9"; // your contract address
const PRIVATE_KEY = process.env.PRIVATE_KEY; // your wallet private key (set in .env)
const PROVIDER_URL = process.env.PROVIDER_URL; // your Sepolia RPC URL (set in .env)

// ====== PRODUCT DATA ======
const products = [
  {
    title: "Vintage Gaming Console",
    description: "Classic gaming console from the 90s, perfect condition with original controllers.",
    priceEth: "0.15",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500&auto=format"
  },
  {
    title: "Digital Art NFT",
    description: "Unique digital artwork created by a renowned artist, comes with certificate of authenticity.",
    priceEth: "0.25",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&auto=format"
  },
  {
    title: "Smart Home Hub",
    description: "Latest generation smart home hub, compatible with all major smart home devices.",
    priceEth: "0.08",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format"
  },
  {
    title: "Premium Headphones",
    description: "High-end wireless noise-cancelling headphones with premium sound quality.",
    priceEth: "0.12",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format"
  },
  {
    title: "Smart Watch",
    description: "Latest model smartwatch with health monitoring and fitness tracking features.",
    priceEth: "0.18",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format"
  },
  {
    title: "Drone with Camera",
    description: "4K camera drone with GPS and obstacle avoidance, perfect for aerial photography.",
    priceEth: "0.35",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500&auto=format"
  },
  {
    title: "Gaming Laptop",
    description: "High-performance gaming laptop with RTX graphics and 32GB RAM.",
    priceEth: "0.45",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format"
  },
  {
    title: "Wireless Earbuds",
    description: "True wireless earbuds with active noise cancellation and 24-hour battery life.",
    priceEth: "0.06",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format"
  },
  {
    title: "Smart Speaker",
    description: "Voice-controlled smart speaker with premium sound quality and smart home integration.",
    priceEth: "0.09",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format"
  },
  {
    title: "Action Camera",
    description: "Waterproof action camera with 4K video recording and image stabilization.",
    priceEth: "0.22",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format"
  },
  {
    title: "Mechanical Keyboard",
    description: "RGB mechanical gaming keyboard with customizable keys and premium switches.",
    priceEth: "0.11",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format"
  },
  {
    title: "Wireless Mouse",
    description: "Ergonomic wireless gaming mouse with adjustable DPI and programmable buttons.",
    priceEth: "0.07",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format"
  }
];

// ====== SCRIPT ======
async function main() {
  if (!PRIVATE_KEY || !PROVIDER_URL) {
    console.error("Please set PRIVATE_KEY and PROVIDER_URL in your .env file.");
    process.exit(1);
  }
  const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

  const owner = await wallet.getAddress();
  const now = Math.floor(Date.now() / 1000);
  const deadline = now + 30 * 24 * 60 * 60; // 30 days from now

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const priceWei = ethers.parseEther(p.priceEth);

    try {
      const tx = await contract.createCampaign(
        owner,
        p.title,
        p.description,
        priceWei,
        deadline,
        p.image
      );
      console.log(`Product ${i + 1}: ${p.title} - TX Hash: ${tx.hash}`);
      await tx.wait();
      console.log(`Product ${i + 1} confirmed!`);
    } catch (err) {
      console.error(`Error adding product ${i + 1}:`, err);
    }
  }
}

main(); 