import {
  useChangeCartElementQuantityMutation,
  useCreateElementInCartMutation,
  useDeleteCartElementMutation,
  useGetCartElementByProductIdQuery,
  useGetCartQuery,
  useLazyGetCartElementByProductIdQuery,
} from '../features/cart/api/cartApi';

export default function useCartElementMutationsApi() {
  //Создать элемент в корзине
  const createElementInCartMutation = useCreateElementInCartMutation();

  //Удалить элемент из корзины
  const deleteCartElementMutation = useDeleteCartElementMutation();

  //Изменить количество в корзине
  const changeCartElementQuantityMutation = useChangeCartElementQuantityMutation();

  return {
    createElementInCartMutation,
    deleteCartElementMutation,
    changeCartElementQuantityMutation,
  };
}
