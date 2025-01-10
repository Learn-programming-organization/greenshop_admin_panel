import { Button } from "antd";
import { CaptionType } from "../types/CaptionType";
import { useNavigate } from "react-router-dom";

const Caption: React.FC<CaptionType> = ({
  title,
  count,
  addBtnTitle,
  path,
}) => {
  const navigate = useNavigate();
  return (
    <div className="py-[10.2px] px-5 flex border-b-[2px] border-[#57c36c] items-center justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-[25px]">{title}</h2>
        <span className="text-slate-500 text-[15px] lowercase">
          {title} {count}
        </span>
      </div>
      <Button
        onClick={() => navigate(`${path}`)}
        className="font-semibold text-[20px] p-5"
        size="large"
        type="primary"
      >
        {addBtnTitle}
      </Button>
    </div>
  );
};

export default Caption;