export interface ActionDetailsProps {
    iconURL: string
    imageURL: string
    action: string
    description: string
    hotkey?: string
}

export const actionDetailsData: ActionDetailsProps[] = [
  {
    iconURL: "/assets/icons/actionIcons/action_generateParent.png",
    imageURL: "/assets/gifs/actionGifs/action_generateParent.gif",
    action: "Generate new parent",
    hotkey: "(alt + w)",
    description:
      "Generate a new parent node from selected nodes. (building upwards)\n" +
      "If more than one selected node are next to each other and also share parent,\n" +
      "they will be handled as a group.\n" +
      "Type the label of the new node(s).",
  },
  {
    iconURL: "/assets/icons/actionIcons/action_addChild.png",
    imageURL: "/assets/gifs/actionGifs/action_addChild.gif",
    action: "Add new child",
    hotkey: "(alt + a)",
    description:
      "Add new child node to selected nodes. (building downwards)\n" +
      "Type the label of the new child node(s).\n" +
      "The new node will appear last (far right) if the selected node already had children.",
  },
  {
    iconURL: "/assets/icons/actionIcons/action_insertNode.png",
    imageURL: "/assets/gifs/actionGifs/action_insertSibling.gif",
    action: "Insert new node",
    hotkey: "(alt + a)",
    description:
      "Insert new node at selected nodes. (building horizontally)\n" +
      "Type the label of the new node(s).\n" +
      "The new node takes the place of the selected node which shifts to the right.",
  },
  {
    iconURL: "/assets/icons/actionIcons/action_deleteNode.png",
    imageURL: "/assets/gifs/actionGifs/action_deleteNode.gif",
    action: "Delete node",
    hotkey: "(alt + x)",
    description:
      "Deletes the selected node(s).\n" +
      "If you delete a node that has children,\n" +
      "they get assigned the parent of the deleted node(s).",
  },
  {
    iconURL: "/assets/icons/actionIcons/action_editNode.png",
    imageURL: "/assets/gifs/actionGifs/action_editNode.gif",
    action: "Edit node",
    hotkey: "(alt + q)",
    description:
      "Edit the selected node(s).\n" +
      "Type the new label of the node(s).\n" +
      "Selected node(s) changes to the input label.",
  },
  {
    iconURL: "/assets/icons/actionIcons/action_mergeLines.png",
    imageURL: "/assets/gifs/actionGifs/action_mergeLines.gif",
    action: "Merge / unmerge children",
    description:
      "Turns branches from selected node(s) into a triangle across all of their children.\n" +
      "If a selected node already has its branches merged,\n" +
      "it will revert back to one branch for each child node.",
  },
  {
    iconURL: "/assets/icons/actionIcons/action_putArrow.png",
    imageURL: "/assets/gifs/actionGifs/action_putArrow.gif",
    action: "Add Arrow",
    description:
      "Must select at least 2 nodes.\n" +
      "The first selected node becomes the source,\n" +
      "and any other selected node becomes target of an arrow originating from the source.",
  },
  {
    iconURL: "/assets/icons/actionIcons/action_removeArrow.png",
    imageURL: "/assets/gifs/actionGifs/action_removeArrow.gif",
    action: "Remove Arrow",
    description:
      "Removes any arrows originating from selected node(s).",
  },
  {
    iconURL: "/assets/icons/actionIcons/action_pickTextColor.png",
    imageURL: "/assets/gifs/actionGifs/action_setTextColor.gif",
    action: "Set text color",
    description:
      "Sets the text color of the selected node(s) to the color picked.",
  },
]
