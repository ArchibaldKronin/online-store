import { BASE_URL_CART } from '../../../constantst';
import { Cart, CartElement } from '../../../types';

export const getCart = async () => {
  const response = await fetch(`${BASE_URL_CART}`);

  if (!response.ok)
    throw {
      status: response.status,
      statusText: response.statusText,
    };

  const cart: Cart = await response.json();
  return cart;
};

export const getCartElementById = async (id: string) => {
  const response = await fetch(`${BASE_URL_CART}/${id}`);

  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
    };
  }

  const cartElement: CartElement = await response.json();
  return cartElement;
};

export const createElementInCart = async (productId: string) => {
  const response = await fetch(`${BASE_URL_CART}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ productId: productId, quantity: 1 }),
  });

  if (!response.ok)
    throw {
      status: response.status,
      statusText: response.statusText,
    };

  const cartElement: CartElement = await response.json();
  return cartElement;
};

export const changeCartElementQuantity = async (arg: { id: string; count: number }) => {
  const response = await fetch(`${BASE_URL_CART}/${arg.id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ quantity: arg.count }),
  });

  if (!response.ok)
    throw {
      status: response.status,
      statusText: response.statusText,
    };

  const cartElement: CartElement = await response.json();
  return cartElement;
};

export const deleteCartElement = async (id: string) => {
  const response = await fetch(`${BASE_URL_CART}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok)
    throw {
      status: response.status,
      statusText: response.statusText,
    };

  const cartElement: CartElement = await response.json();
  return cartElement;
};
