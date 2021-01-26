export const objectToArray = (obj) => {
  const {byId, allIds} = obj;
  return [...allIds].map(id => byId[id]);
}