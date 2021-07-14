import express from 'express';
import productRouter from "./routes/product";
import guideRouter from "./routes/guide";

export const server = {
        server: function() {
                const app = express();
                app.use(express.json());
                app.use(express.urlencoded({ extended: true }));
                app.use('/api/product', productRouter);
                app.use('/', guideRouter);
                return app;
        }
}