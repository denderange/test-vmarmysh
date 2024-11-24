import { useEffect, useState } from "react";
import { createNewNode, renameNode } from "../api";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import RiseLoader from "react-spinners/RiseLoader";

type Props = {
	currentName: string;
	currentId: number;
	actionType: string;
	open: boolean;
	onClose: () => void;
};

const Modal = ({
	open,
	onClose,
	actionType,
	currentName,
	currentId,
}: Props) => {
	const [inputValue, setInputValue] = useState<string>("");
	const queryClient = useQueryClient();

	const mutationCreateNew = useMutation({
		mutationFn: createNewNode,
		onSuccess: () => {
			toast("SUCCESSFULLY SAVED");
			onClose();
			queryClient.invalidateQueries({ queryKey: ["nodesTree"] });
		},
	});

	const mutationRenameNode = useMutation({
		mutationFn: renameNode,
		onSuccess: () => {
			toast("SUCCESS! Renamed node");
			onClose();
			queryClient.invalidateQueries({ queryKey: ["nodesTree"] });
		},
	});

	const handleButtonAction = async () => {
		if (actionType === "create") {
			mutationCreateNew.mutate({
				treeName: "Denderange",
				nodeId: currentId,
				newNodeName: inputValue,
			});
		} else if (actionType === "redact") {
			mutationRenameNode.mutate({
				treeName: "Denderange",
				nodeId: currentId,
				newNodeName: inputValue,
			});
		}
	};

	const handleCloseModal = () => {
		onClose();
	};

	useEffect(() => {
		if (actionType === "create") {
			setInputValue("");
		} else setInputValue(currentName);
	}, [currentName, actionType]);

	return (
		<div
			onClick={() => handleCloseModal()}
			className={`fixed inset-0 flex justify-center align-middle transition-colors ${
				open ? "visible bg-black/50" : "invisible"
			}`}>
			<div
				onClick={(e) => e.stopPropagation()}
				className='max-h-max w-96 m-auto bg-white rounded-md'>
				<p className='border-b p-4'>
					{actionType === "create" ? "Add" : "Rename"}
				</p>
				<div className='border-b p-4 relative'>
					<span className='text-xs text-gray-400 px-2 bg-white absolute top-2 left-6'>
						{actionType === "create" ? "New Node" : "Rename Node"}
					</span>
					<input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						type='text'
						placeholder='Title'
						className='w-full p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:border-slate-800 transition-colors duration-300 hover:border hover:border-slate-800 placeholder:text-blue-800/50'
					/>
				</div>
				<div className='flex place-content-end gap-4 pt-8 pr-4 pb-4'>
					<button
						onClick={() => handleCloseModal()}
						className='py-2 px-6 border border-blue-800/30 text-blue-800 uppercase rounded-md hover:bg-blue-800/10 transition-colors duration-300'>
						Cancel
					</button>
					{mutationCreateNew.isPending || mutationRenameNode.isPending ? (
						<RiseLoader
							color={"red"}
							size={15}
							aria-label='Loading Spinner'
							data-testid='loader'
						/>
					) : (
						<button
							onClick={handleButtonAction}
							className='py-2 px-6 bg-blue-800 text-white uppercase rounded-md hover:bg-blue-800/90 transition-colors duration-300'>
							{actionType === "create" ? "Add" : "Rename"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
