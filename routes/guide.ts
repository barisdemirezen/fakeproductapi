import express from 'express';

import {guide} from '../controllers/guide';

const router = express.Router();

router.get('/', guide.homePage);

export = router;
