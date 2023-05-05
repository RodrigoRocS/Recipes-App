import { useContext } from 'react';
import { GetFormsContext } from '../context/GetFormsProvider';

const useGetFormsContext = () => useContext(GetFormsContext);

export default useGetFormsContext;
