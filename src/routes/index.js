import secreRoutes from '../api/v1/secrets';




const apiPrefix = '/v1';

const routes = [ secreRoutes];

export default app => {
  routes.forEach(element => {
    app.use(apiPrefix, element);
  });
  return app;
};
