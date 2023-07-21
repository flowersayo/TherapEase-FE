interface buttonProps {
  icon?: React.ReactNode;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const ButtonLarge = ({
  text,
  onClick,
  disabled = false,
}: buttonProps) => {
  return (
    <button
      className={`w-[36.9rem] h-[6.2rem] text-heading3 rounded-[4.8rem] ${
        disabled ? 'text-white bg-gray-6' : 'text-black bg-yellow-100'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export const ButtonMedium = ({
  text,
  onClick,
  disabled = false,
}: buttonProps) => {
  return (
    <button
      className={`w-[32.1rem] h-[6.2rem] text-heading3 rounded-[4.8rem] ${
        disabled ? 'text-white bg-gray-6' : 'text-black bg-yellow-100'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export const ButtonSmall = ({ icon, text, onClick }: buttonProps) => {
  return (
    <button
      className={
        'w-fit y-fit text-[1.4rem] px-[1.0rem] py-[.8rem] rounded-[.8rem] flex justify-center items-center gap-[.8rem] text-white bg-gray-9'
      }
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};
