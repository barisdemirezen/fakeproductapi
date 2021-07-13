import express from 'express';

import productRouter = require("./routes/product")
import guideRouter = require("./routes/guide")

export function server(){

        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/api/product', productRouter);
        app.use('/', guideRouter);
        return app;
}
