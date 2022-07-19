const apiUrl = "https://truefoundry-assignment.herokuapp.com";
export const login = async (code: string) => {
  try {
    const url = `${apiUrl}/user/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const searchRepo = async (query: string) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${apiUrl}/repo?name=${query}`;
    const response = await fetch(url,{headers:{
      "Authorization": `${token}`
    }});
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export const createRepo = async (name: string, pvt:boolean) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${apiUrl}/repo`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({ name,private:pvt }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export const getUser = async () => {
  const token = localStorage.getItem("token");
  try {
    const url = `${apiUrl}/user`;
    const response = await fetch(url, {
      headers: {
        "Authorization": `${token}`
      }
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}