import { LinkedListNode } from "../DataStructures/LinkedList";
import Node from "./Node";

const LinkedList = () => {
  const root = new LinkedListNode(1);
  root.append(2);
  root.append(3);
  root.append(4);
  console.log(root);

  const values = root.intoArray();
  console.log({ values });

  const children = values.map((nodeValue, index) => (
    <Node value={nodeValue} key={index} />
  ));

  return <div>{children}</div>;
};

export default LinkedList;
