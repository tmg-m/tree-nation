type RefreshHandler = () => void;

export function refreshListeners(
    onRefresh: RefreshHandler,
): () => void {
    const refreshWhenVisible = (): void => {
        if (document.visibilityState === 'visible') {
            onRefresh();
        }
    };

    window.addEventListener('focus', onRefresh);
    window.addEventListener('dashboard:visit-recorded', onRefresh);
    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
        window.removeEventListener('focus', onRefresh);
        window.removeEventListener('dashboard:visit-recorded', onRefresh);
        document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
}
