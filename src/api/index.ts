const baseUrl = "https://test.vmarmysh.com";
import type { TreeNode } from "../types/types";

export const getAllNodes = async (
	treeName = "Denderange"
): Promise<TreeNode> => {
	try {
		const response = await fetch(
			`${baseUrl}/api.user.tree.get?treeName=${treeName}`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: TreeNode = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching nodes:", error);
		throw new Error("Failed to fetch nodes tree");
	}
};

export const createNewNode = async (data: {
	treeName: "Denderange";
	nodeId: number;
	newNodeName: string;
}) => {
	try {
		const response = await fetch(
			`${baseUrl}/api.user.tree.node.create?treeName=${data.treeName}&parentNodeId=${data.nodeId}&nodeName=${data.newNodeName}`,
			{
				method: "POST",
				headers: {
					accept: "application/json",
				},
				body: JSON.stringify({}),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response;
	} catch (error) {
		console.error("Error creating new node:", error);
		throw error;
	}
};

export const renameNode = async (data: {
	treeName: "Denderange";
	nodeId: number;
	newNodeName: string;
}) => {
	try {
		const response = await fetch(
			`${baseUrl}/api.user.tree.node.rename?treeName=${data.treeName}&nodeId=${data.nodeId}&newNodeName=${data.newNodeName}`,
			{
				method: "POST",
				headers: {
					accept: "application/json",
				},
				body: JSON.stringify({}),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response;
	} catch (error) {
		console.error("Error creating new node:", error);
		throw error;
	}
};

export const deleteNode = async (data: {
	treeName: "Denderange";
	nodeId: number;
}) => {
	try {
		const response = await fetch(
			`${baseUrl}/api.user.tree.node.delete?treeName=${data.treeName}&nodeId=${data.nodeId}`,
			{
				method: "POST",
				headers: {
					accept: "application/json",
				},
				body: JSON.stringify({}),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response;
	} catch (error) {
		console.error("Error creating new node:", error);
		throw error;
	}
};
