export const useTreatError = () => {
  const treatError = (err: any) => {
    return JSON.stringify(err).replace('"', "").replace('"', "");
  };

  return { treatError };
};
