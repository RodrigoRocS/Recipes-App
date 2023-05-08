import { useContext } from 'react';
import { GetFormsContext } from './GetFormsProvider';

const useGetFormsContext = () => useContext(GetFormsContext);

export default useGetFormsContext;
