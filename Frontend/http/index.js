 
async function fetchAdmin(url, options, router) {
        
    const response = await fetch(`${window.url}/${url}`, options);
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    return response;
  }
  
  export { fetchAdmin };