export const formatters = {
  capitalize: (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  truncate: (str: string, length: number) => {
    if (str.length <= length) return str;
    return str.substring(0, length) + "...";
  },

  removeEmptyFields: (obj: any) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );
  },
};
