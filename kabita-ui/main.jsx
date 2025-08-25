const { createElement, useState, useMemo, useEffect } = React;

const App = () => createElement(window.AppComponent);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(createElement(App));