export const btnGroupYesNoToBool = (value) => {
  let bool;
  if (value === 0) {
    bool = true;
  } else if (value === 1) {
    bool = false;
  }
  return bool;
};

export const btnGroupBoolToYesNo = bool => (bool ? 0 : 1);
