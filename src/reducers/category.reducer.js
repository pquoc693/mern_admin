import { categoryConstansts } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null
};


const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  if (parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        children: []
      }
    ];
  }

  for (let cat of categories) {

    if (cat._id == parentId) {
      myCategories.push({
        ...cat,
        children: cat.children ? buildNewCategories(parentId, [...cat.children, {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          type: category.type,
          parentId: category.parentId,
          children: category.children
        }], category) : []
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
      });
    }


  }


  return myCategories;
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories
      }
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
      console.log('updated categoires', updatedCategories);

      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      }
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error
      }
      break;
    case categoryConstansts.UPDATE_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case categoryConstansts.UPDATE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break;
    case categoryConstansts.UPDATE_CATEGORIES_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break;
    case categoryConstansts.DELETE_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case categoryConstansts.DELETE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break;
    case categoryConstansts.DELETE_CATEGORIES_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
  }

  return state;
} 