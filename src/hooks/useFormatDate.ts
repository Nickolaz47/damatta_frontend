export const useFormatDate = () => {
  const formatDateToFront = (date: string) => {
    const formattedDate = date.split("T")[0];
    return formattedDate;
  };

  const formatDateToUser = (date: string) => {
    const cleanDate = date.split("T")[0];
    const day = cleanDate.split("-")[2];
    const month = cleanDate.split("-")[1];
    const year = cleanDate.split("-")[0];

    return `${day}/${month}/${year}`;
  };

  return { formatDateToFront, formatDateToUser };
};
