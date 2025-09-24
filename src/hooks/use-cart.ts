import { useContext } from 'react';
import { useCart as useCartContext } from '../context/cartContext';

export const useCart = () => useCartContext();
