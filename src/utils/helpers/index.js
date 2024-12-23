export const checkRole = (user_role = "", role = "") => {
   const userRole = user_role?.toLowerCase();
   return userRole === role
}

export const RoundTwoDecimals = (number = 0) => {
   return Math.round(number);
};

export const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

export const money = event => {
   return (addCommas(removeNonNumeric(event.target.value)))
}

