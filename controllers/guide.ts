import {  Request, Response } from "express";

export const guide = {
  homePage : function (req: Request, res: Response) {
    res.render('index');
  }
}