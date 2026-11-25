import { routeHref } from '../urls';

export default function ShopLink({ href, onNavigate, onClick, children, ...props }) {
  function handleClick(event) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(href);
  }

  return <a href={routeHref(href)} {...props} onClick={handleClick}>{children}</a>;
}
