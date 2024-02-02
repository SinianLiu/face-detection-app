export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return await response.json();
};

// T return any type
// U is a generic type parameter
export const postData = async <T, U>(url: string, data: U): Promise<T> => {
  const response = await fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await response.json();
};

// export const putData = async <U>(url: string, data: U): Promise<number> => {
//   const response = await fetch(url, {
//     method: 'put',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ data }),
//   });

//   const text = await response.text();
//   return Number(text);
// };

