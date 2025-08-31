const ANIMATION_DELAY_MS = 1;
export const disableAnimation = () => {
    const css = document.createElement('style');
    css.appendChild(document.createTextNode(`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`));
    document.head.appendChild(css);
    return () => {
        // Force to restyle
        (() => window.getComputedStyle(document.body))();
        // Wait for the next tick before removing
        setTimeout(() => {
            document.head.removeChild(css);
        }, ANIMATION_DELAY_MS);
    };
};
