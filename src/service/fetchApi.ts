const fetchData = async () => {
  const response = await fetch("/api/destinasi");
  const data = await response.json();
  return data;
};

export default fetchData;
