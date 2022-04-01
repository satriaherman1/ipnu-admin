import dynamic from "next/dynamic";

interface ITextEditorProps {
  onChange: (e: any) => any;
  value: any;
  defaultValue?: string;
}

export default function TextEditor(props: ITextEditorProps): React.ReactElement {
  const { onChange, value, defaultValue } = props;
  const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
  });
  return (
    <>
      <QuillNoSSRWrapper defaultValue={defaultValue ? defaultValue : ""} value={value} onChange={onChange} className="relative lg:mb-[40px] w-full" />
    </>
  );
}
