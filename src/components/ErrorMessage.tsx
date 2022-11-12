import tw from 'twin.macro';

import CloseErrorMessage from '@/assets/icons/closeErrorMessage.svg';

const Message = tw.p`
  border-2 border-red-300 bg-red-200 text-red-500
  normal-case relative
  p-1 mt-1 rounded-md text-2xl
  font-medium md:font-bold text-center
`;

const CloseIcon = tw.img`
  absolute h-2 
  right-0.5 top-0.5
  cursor-pointer
`;

interface Props {
  message: string;
  closeMessage: () => void;
}

export function ErrorMessage({ message, closeMessage }: Props): JSX.Element {
  return (
    <Message>
      <CloseIcon
        alt="closeErrorMessage"
        src={CloseErrorMessage}
        onClick={closeMessage}
      />
      {message}
    </Message>
  );
}
