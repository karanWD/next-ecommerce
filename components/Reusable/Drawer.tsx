import React, {FC} from 'react';

type Props = {
  isOpen:boolean
  children:any
  closeHandler:()=>void
}
const Drawer:FC<Props> = ({isOpen,children,closeHandler}) => {
  const openClass="translate-y-0"
  const closeClass="translate-y-full"
  const basicStyle = "bg-white rounded-t-lg p-4 fixed bottom-0 w-full duration-300 delay-100"
  const containerOpenStyle="opacity-1 z-50"
  const containerCloseStyle="opacity-0 -z-1 pointer-events-none"
  return (
      <div className={"h-screen fixed top-0 left-0 w-full" + " " + (isOpen?containerOpenStyle:containerCloseStyle)}>
        <div className="w-full h-full absolute top-0 left-0 bg-black/70" onClick={closeHandler}></div>
        <div className={basicStyle+" "+(isOpen?openClass:closeClass)}>
          {children}
        </div>
      </div>
  );
};

export default Drawer;
