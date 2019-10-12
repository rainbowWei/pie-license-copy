var storage = {
  set(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  },
  get(key){
    return JSON.parse(localStorage.getItem(key));
  },
  remove(value){
    localStorage.removeItem(value);
  }
}

export default storage;
