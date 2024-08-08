import React, { Dispatch } from 'react';

interface NewPasswordType {
  setStep: Dispatch<React.SetStateAction<number>>;
}

const NewPassword = ({ setStep }: NewPasswordType) => {
  return (
    <div>
      <div>asd</div>
    </div>
  );
};

export default NewPassword;
