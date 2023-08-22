import { Router } from "express";
import { getInformationFromSapienForSamirController, getInformationFromSapienForSamirControllerSemIdade } from "../modules/GetInformationFromSapienForSamir";


//const sessao = request.session();

export const routerGetInformationsForPicaPau = Router();

/**
 * @swagger
 * /samir/getInformationFromSapienForSamir:
 *   post:
 *     summary: get Information From Sapien For Samir
 *     tags: [GetInformationFromSapien]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetInformationsFromSapiens'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformationsForCalcule'
 *                 
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 */


routerGetInformationsForPicaPau.post("/getInformationFromSapienForSamir", async (req, res) => {
    console.log(req)
    return getInformationFromSapienForSamirController.handle(req, res);
})






/**
 * @swagger
 * /samir/getInformationFromSapienForSamirSemIdade:
 *   post:
 *     summary: get Information From Sapien For Samir
 *     tags: [GetInformationFromSapien]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetInformationsFromSapiens'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformationsForCalcule'
 *                 
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 */


routerGetInformationsForPicaPau.post("/getInformationFromSapienForSamirSemIdade", async (req, res) => {
    return getInformationFromSapienForSamirControllerSemIdade.handle(req, res);
})




















/**
 * @swagger
 * /samir/getInformationFromSapiesForPicaPau:
 *   post:
 *     summary: get Information From Sapien For Samir
 *     tags: [GetInformationFromSapien]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetInformationsFromSapiens'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformationsForCalcule'
 *                 
 *       500:
 *         description: Some server error
 *       400:
 *         description: The request error
 */

routerGetInformationsForPicaPau.post("/getInformationFromSapiesForPicaPau",async (req, res) => {
    return getInformationFromSapienForSamirController.handle(req, res);
    
})