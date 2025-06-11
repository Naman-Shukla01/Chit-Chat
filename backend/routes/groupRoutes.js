import { Router } from "express";
import { allGroups, createGroup, joinGroup } from "../controllers/groupController.js";

const router = Router();

router.route("/").get(allGroups)
router.route("/join").post(joinGroup);
router.route("/create").post(createGroup);

export default router;