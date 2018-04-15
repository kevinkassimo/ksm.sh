const UPDATE_ABOUT = 'update-about';

export const updateAbout = (payload) => {
  return {
    type: UPDATE_ABOUT,
    payload
  };
};

const INITIAL_STATE = {
  about: [],
  education: [],
  contact: [],
  skill: [],
  project: [],
};

export const aboutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ABOUT:
      return {
        ...state,
        about: action.payload.about || [],
        education: action.payload.education || [],
        contact: action.payload.contact || [],
        skill: action.payload.skill || [],
        project: action.payload.project || [],
      };
    default:
      return {
        ...state,
      };
  }
};
