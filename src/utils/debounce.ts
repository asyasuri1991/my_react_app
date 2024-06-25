const debounce = (fn: () => void, interval: number) => {
  let timer: number;

  return () => {
    clearTimeout(timer);

    timer = window.setTimeout(() => fn(), interval);
  }
}

export default debounce;