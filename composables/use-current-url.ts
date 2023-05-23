export function useCurrentUrl() {
	const event = useRequestEvent();
	return event ? event.node.req.url : window.location.href;
}
