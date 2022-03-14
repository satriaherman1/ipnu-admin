interface ImainContentProps {
  children: any;
}

export default function MainContent(props: ImainContentProps) {
  const { children } = props;
  return <div className="py-[30px] px-[20px] lg:px-[40px] w-[100%] mt-[60px] lg:mt-0">{children}</div>;
}
