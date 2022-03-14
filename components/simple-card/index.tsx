import { AccountCircle, Group } from "@mui/icons-material";
import { Box } from "@mui/material";

interface ISimpleCard {
  headerTitle: string;
  content: string;
  icon: any;
  bgIcon?: string;
  className?: string;
}

export default function SimpleCard(props: ISimpleCard) {
  const { headerTitle, content, icon, bgIcon, className } = props;
  return (
    <Box className={`w-[300px] shadow-lg py-[20px] px-[30px] rounded-md flex justify-between items-center ${className && className}`}>
      <div>
        <p className="text-[#55698a]">{headerTitle}</p>
        <h2 className="text-[30px]">{content}</h2>
      </div>

      <div className={`rounded-full p-[10px]`} style={{ background: bgIcon }}>
        {icon}
      </div>
    </Box>
  );
}
