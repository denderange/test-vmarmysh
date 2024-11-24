import {
	ChevronDown,
	ChevronRight,
	CirclePlus,
	Pencil,
	Trash,
} from "lucide-react";
import Modal from "./Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteNode } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TreeNode = {
	id: number;
	name: string;
	children: TreeNode[];
};

export const TreeNodeComponent: React.FC<{
	node: TreeNode;
	selectedId: number | null;
	openNodes: Set<number>;
	onSelect: (id: number) => void;
	onToggle: (id: number) => void;
}> = ({ node, selectedId, openNodes, onSelect, onToggle }) => {
	const queryClient = useQueryClient();
	const isOpen = openNodes.has(node.id);
	const isSelected = node.id === selectedId;
	const [openModal, setOpenModal] = useState(false);
	const [actionType, setActionType] = useState("");

	const mutationDeleteOne = useMutation({
		mutationFn: deleteNode,
		onSuccess: () => {
			toast("Удалено!");
			queryClient.invalidateQueries({ queryKey: ["nodesTree"] });
		},
	});

	const handleClickNode = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		onToggle(node.id);
		onSelect(node.id);
	};

	const createNewNode = () => {
		setActionType("create");
		setOpenModal(() => true);
	};

	const redactNode = () => {
		setActionType("redact");
		setOpenModal(() => true);
	};

	return (
		<div className='ml-5'>
			<div
				onClick={(e) => handleClickNode(e)}
				className={`flex items-center ml-2 ${
					isSelected ? "bg-cyan-100" : "hover:bg-stone-50"
				}`}>
				{node.children.length > 0 &&
					(isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
				<span className='ml-2'>{node.name}</span>

				{isSelected && (
					<div className='flex ml-6 gap-2'>
						<button onClick={createNewNode}>
							<CirclePlus
								size={16}
								className='text-green-800 hover:text-yellow-500 transition duration-300'
							/>
						</button>
						<button onClick={redactNode}>
							<Pencil
								size={16}
								className='text-blue-800 hover:text-yellow-500 transition duration-300'
							/>
						</button>
						<button
							onClick={() =>
								mutationDeleteOne.mutate({
									treeName: "Denderange",
									nodeId: node.id,
								})
							}>
							<Trash
								size={16}
								className='text-red-800 hover:text-yellow-500 transition duration-300'
							/>
						</button>
					</div>
				)}
			</div>

			{isOpen && (
				<ul>
					{node.children.map((child) => (
						<li key={child.id}>
							<TreeNodeComponent
								node={child}
								selectedId={selectedId}
								openNodes={openNodes}
								onSelect={onSelect}
								onToggle={onToggle}
							/>
						</li>
					))}
				</ul>
			)}

			<Modal
				actionType={actionType}
				currentName={node.name}
				currentId={node.id}
				open={openModal}
				onClose={() => setOpenModal(false)}
			/>
		</div>
	);
};
