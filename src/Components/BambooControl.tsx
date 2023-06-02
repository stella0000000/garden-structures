import { LinkedListFromArray } from "../DataStructures/LinkedList";

export const BambooControl = ({
  value: values,
  setValue: setValues,
}: {
  value: number[];
  setValue: (a: number[]) => void;
}) => {
  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = [...values];
    newVal.splice(i, 1, Number(e.currentTarget.value));
    setValues(newVal);
  };

  const handleAppend = () => {
    let newLinkedList = LinkedListFromArray(values);
    newLinkedList.append(Math.ceil(Math.random() * 10));
    setValues(newLinkedList.intoArray());
  };

  const handlePop = () => {
    const len = values.length;
    let newLinkedList = LinkedListFromArray(values);
    newLinkedList.delete(len - 1);
    setValues(newLinkedList.intoArray());
  };

  return (
    <>
      {values
        ? values.map((value, i) => {
            return (
              <input
                key={i}
                type="number"
                onChange={(e) => handleChange(i, e)}
                value={value}
              />
            );
          })
        : []}
      <div>
        <button onClick={handleAppend}>Append</button>
        <button onClick={handlePop}>Pop</button>
      </div>
    </>
  );
};
