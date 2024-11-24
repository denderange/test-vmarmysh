import { useState } from "react";
import { TreeNodeComponent } from "./components/TreeNodeComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { getAllNodes } from "./api";
import type { TreeNode } from "./types/types";

function App() {
	const treeName = "Denderange";
	const userTree = useQuery<TreeNode>({
		queryKey: ["nodesTree", treeName],
		queryFn: () => getAllNodes(treeName),
	});
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [openNodes, setOpenNodes] = useState<Set<number>>(new Set());

	const toggleNode = (id: number) => {
		setOpenNodes((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	};

	return (
		<div className='w-4/5 mx-auto bg-white min-h-full p-4'>
			<div className='-ml-6'>
				{userTree.data && (
					<TreeNodeComponent
						node={userTree.data}
						selectedId={selectedId}
						openNodes={openNodes}
						onSelect={setSelectedId}
						onToggle={toggleNode}
					/>
				)}
			</div>
			<ToastContainer />
		</div>
	);
}

export default App;
