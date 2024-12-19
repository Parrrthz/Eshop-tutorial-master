import axios from "axios";
import { server } from "../../server";

// create polish
export const createPolish =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "polishCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/polish/create-polish`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      );
      dispatch({
        type: "polishCreateSuccess",
        payload: data.polish,
      });
    } catch (error) {
      dispatch({
        type: "polishCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// get All Polishes of a shop
export const getAllPolishesShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllPolishesShopRequest",
    });

    const { data } = await axios.get(
      `${server}/polish/get-all-polishes-shop/${id}`
    );
    dispatch({
      type: "getAllPolishesShopSuccess",
      payload: data.polishes,
    });
  } catch (error) {
    dispatch({
      type: "getAllPolishesShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete polish of a shop
export const deletePolish = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePolishRequest",
    });

    const { data } = await axios.delete(
      `${server}/polish/delete-shop-polish/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deletePolishSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePolishFailed",
      payload: error.response.data.message,
    });
  }
};

// get all polishes
export const getAllPolishes = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllPolishesRequest",
    });

    const { data } = await axios.get(`${server}/polish/get-all-polishes`);
    dispatch({
      type: "getAllPolishesSuccess",
      payload: data.polishes,
    });
  } catch (error) {
    dispatch({
      type: "getAllPolishesFailed",
      payload: error.response.data.message,
    });
  }
};
