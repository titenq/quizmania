import { Dispatch, SetStateAction } from 'react';

export interface IModalErrorProps {
  errorMessage: string | null;
  shouldNavigate?: boolean;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
}
