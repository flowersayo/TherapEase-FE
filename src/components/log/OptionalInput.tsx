interface Props {
  question: React.ReactNode;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const OptionalInput = ({ question, inputValue, setInputValue }: Props) => {
  // const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <div className="w-fit flex flex-col items-center select-none">
      <span className="text-body3 text-gray-5 mb-[0.2rem]">
        선택 항목입니다
      </span>
      <span className="text-heading2 text-gray-9 mb-[2.4rem] text-center">
        {question}
      </span>
      <textarea
        className="box-border w-[58.3rem] h-[19.75rem] px-[6.8rem] py-[5.525rem] text-body1 text-gray-8 bg-white rounded-[2rem] resize-none focus:outline-none placeholder:text-gray-4"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="답변을 입력해주세요. (선택)"
        maxLength={99}
        spellCheck="false"
      />
      <span className="text-label1 text-gray-5 mt-[calc(-2.55rem-1.2rem)] ml-auto mr-[6.8rem] my-[2.55rem]">
        {inputValue.length}/100
      </span>
    </div>
  );
};

export default OptionalInput;
