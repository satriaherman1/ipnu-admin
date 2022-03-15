export default function reducer(state: any, action: any) {
  switch (action.type) {
    case "CHANGE_BREADCRUMBS":
      return {
        ...state,
        breadCrumbs: action.breadCrumbs,
      };
    case "HIDE_SEARCH":
      return {
        ...state,
        searchModal: false,
      };
  }
}
