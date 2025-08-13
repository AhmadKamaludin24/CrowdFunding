import {Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import CreateCampaigns from "./pages/CreateCampaigns";
import CampaignDetail from "./pages/CampaignDetail";

export function App() {
	return (
		<main className="relative min-h-svh bg-[#13131a] flex flex-row sm:p-8 p-4">
			<div className="sm:flex hidden mr-10 relative">
				<Sidebar/>
			</div>

			<div className="flex-1 max-sm:w-full mx-w-[1280px] mx-auto ">
				<Navbar/>
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route path="/create-campaign" element={<CreateCampaigns/>} />
					<Route path="/campaign-details/:title" element={<CampaignDetail/>} />
				</Routes>
			</div>
		</main>
	);
}
