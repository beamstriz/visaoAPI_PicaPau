export type Coockie = {
    PHPSESSID: string,
    dtCookie: string
}/**
 * @swagger
 * components:
 *   schemas:
 *     Coockie:
 *       type: object
 *       required:
 *         - PHPSESSID
 *         - dtCookie
 *       properties:
 *         PHPSESSID:
 *           type: string
 *           description: PHPSESSID
 *         dtCookie:
 *           type: string
 *           description: dtCookie
 *       example:
 *         PHPSESSID: fdsasDSCVFEDAxzXAS
 *         dtCookie: CDDCDQ3E43EDADSCXAXW
 * */