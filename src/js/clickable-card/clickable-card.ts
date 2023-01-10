export default () => {
  document.addEventListener('click', (e: MouseEvent) => {
    const { target } = e;
    console.log(target);
    if((target as HTMLElement).closest('.postlist-item') && !(target as HTMLElement).matches('a')) {
      const link: HTMLElement = (target as HTMLElement).closest('.postlist-item').querySelector('.postlist-link');
      if(link) {
        link.click();
      }
    }
  })
}
