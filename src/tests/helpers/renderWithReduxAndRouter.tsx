import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, type RenderOptions } from '@testing-library/react';
import { type AppStore, type PreloadedRootState, setupStore } from 'store';
import rootRouter from 'router';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedRootState;
  store?: AppStore;
  routes?: string[];
  router?: ReturnType<typeof createMemoryRouter>;
}

function renderWithReduxAndRouter({
  preloadedState,
  store = setupStore(preloadedState),
  routes = ['/'],
  router = createMemoryRouter(rootRouter.routes, {
    initialEntries: routes,
    initialIndex: 0,
  }),
  ...renderOptions
}: ExtendedRenderOptions = {}) {
  function Wrapper(): JSX.Element {
    return (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  }

  return {
    ...render(<Wrapper />, { ...renderOptions }),
    store,
    router,
  };
}

export default renderWithReduxAndRouter;
