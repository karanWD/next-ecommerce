import {FC} from "react";
import Loading from "../../public/icons/Loading";

type Props = {
    type?: "button" | "submit" | "reset";
    extraClass?: string;
    size?: "sm" | "lg" | "xl";
    value: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<Props> = ({
                               size = "sm",
                               value,
                               extraClass,
                               onClick,
                               children,
                               type = "button",
                               disabled = false,
                               loading
                           }) => {
    let btnSize = "";
    if (size === "sm") {
        btnSize = "py-2 sm:py-1 px-5 text-sm";
    } else if (size === "lg") {
        btnSize = "py-3 sm:py-2 px-6 text-lg";
    } else {
        btnSize = "py-4 sm:py-3 px-7 text-xl";
    }
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center sm:text-base ${btnSize} border border-gray500 ${
                disabled
                    ? "bg-gray400 text-gray300 cursor-not-allowed opacity-70"
                    : "bg-gray500 text-gray100 hover:text-gray300"
            } ${extraClass}`}
        >
            {loading ? <Loading/> : value}
            {children && <span className="ml-1">{children}</span>}
        </button>
    );
};

export default Button;
