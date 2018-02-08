/**
 * @return {object}    An action object with a type of LOAD_LIST_ITEM
 */
export function loadListItem() {
  return {
    type: 'LOAD_LIST_ITEM',
  };
}

export function loadDataItem(items) {
  return {
    type: 'LOAD_LIST_ITEM_SUCCESS',
    data: items,
  };
}
